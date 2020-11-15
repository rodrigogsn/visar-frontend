import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import {
  Title,
  Paragraph,
  ButtonSuccess,
  TextInput,
  DropListDay,
  DropListMonth,
  DropListTime,
  Loader,
} from './../../components/Elements';
import { _agendamento } from './../../views/content';

import api from './../../services/api';
import MainContext from './../../MainContext';

const AgendamentoCard = () => {
  let history = useHistory();

  const {
    profile,
    category,
    subcategory,
    spot,
    address,
    location,
    method,
    subtotal,
  } = useContext(MainContext);

  /** Essas alterações de valor são TEMPORÁRIAS e DEVEM SER REMOVIDAS após a PANDEMIA */
  var extra_discount = 0;

  /** Essas alterações de valor são TEMPORÁRIAS e DEVEM SER REMOVIDAS após a PANDEMIA */
  if (spot.freetax === 1 && subtotal.subcategory >= 200) {
    extra_discount = 40.01 + subtotal.method;
  }

  /** Essas alterações de valor são TEMPORÁRIAS e DEVEM SER REMOVIDAS após a PANDEMIA */
  if (spot.freetax === 1 && subtotal.subcategory < 200) {
    extra_discount = 20.01 + subtotal.method;
  }

  /** Essas alterações de valor são TEMPORÁRIAS e DEVEM SER REMOVIDAS após a PANDEMIA */
  if (
    spot.freetax === 0 &&
    subtotal.subcategory >= 200 &&
    location.name === 'Santos'
  ) {
    extra_discount = 40.01;
  }

  /** Essas alterações de valor são TEMPORÁRIAS e DEVEM SER REMOVIDAS após a PANDEMIA */
  if (
    spot.freetax === 0 &&
    subtotal.subcategory < 200 &&
    location.name === 'Santos'
  ) {
    extra_discount = 20.01;
  }

  /** O extra_discount deverá ser removido após a PANDEMIA */
  const total =
    subtotal.subcategory + subtotal.spot + subtotal.method - extra_discount;

  const [storage, setStorage] = useState('');

  const [buttonText, setButtonText] = useState(`Pagar: R$${total}`);

  const [workTime, setWorkTime] = useState([]);

  const [selectedDay, setSelectedDay] = useState(null);

  const [blockedWeekdays, setBlockedWeekdays] = useState(['dom', 'sáb']);

  const [vehicle, setVehicle] = useState({
    plate: '',
    brand: '',
    model: '',
    year: '',
    detran: '',
    renavam: '',
  });

  const [date, setDate] = useState({
    day: '',
    month: '',
    year: '',
    time: '',
    currentMonth: '',
    currentDay: '',
    currentYear: '',
  });
  const [daysByMonth, setDaysByMonth] = useState([]);

  const [card, setCard] = useState({
    cc_number: '',
    cc_exp: '',
    cc_cvv: '',
    cc_name: '',
  });

  const [validation, setValidation] = useState({
    cc_number: '',
    cc_exp: '',
    cc_cvv: '',
    cc_name: '',
  });

  const handleCardInput = e => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const emptyMaskValidate = e => {
    const index = e.target.value.indexOf('_');

    if (index !== -1) {
      setValidation({ ...validation, [e.target.name]: 'inputError' });
    } else {
      setValidation({ ...validation, [e.target.name]: '' });
    }
  };

  const handleWorkTime = async () => {
    await api.get('/work_times').then(response => {
      let data = response.data.map(item => {
        return item.value;
      });

      /**
       *
       * Este slice SOMENTE pode ficar presente DURANTE a PANDEMIA,
       * limitando os horários de atendimento
       *
       */
      if (spot.freetax === 1) {
        // Loja
        data = data.sort().slice(0, 18);
      }

      if (spot.freetax === 0) {
        // Domicílio
        const validInterval = data.filter(e => !e.includes(':30'));

        data = validInterval.sort().slice(1, 5);
      }

      setWorkTime(data);
    });
  };

  const handleVehicleInput = e => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleDateInput = (e, daysByMonth) => {
    if (e.target.name === 'day') {
      setDate({ ...date, time: '' });
      setSelectedDay(daysByMonth.find(elem => elem.d === e.target.value));
    }

    if (e.target.name === 'month') {
      setDate({ ...date, day: '', time: '' });
      getDaysInMonth(e.target.value);
    }

    setDate({ ...date, [e.target.name]: e.target.value });
  };

  /**
   * Get Javascript array with all days from selected month
   */
  const getDaysInMonth = async selectedMonth => {
    let d = new Date(date.year, selectedMonth, 1);
    let days = [];

    while (d.getMonth() == selectedMonth) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }

    const result = days
      .filter(item => {
        const w = item
          .toLocaleDateString('pt-BR', { weekday: 'short' })
          .substring(0, 3);

        return !blockedWeekdays.includes(w);
      })
      .map(item => {
        const d = item.toLocaleDateString('pt-BR');
        const w = item
          .toLocaleDateString('pt-BR', { weekday: 'short' })
          .substring(0, 3);

        return { d, w };
      });

    /**
     * Get All Appointments from API
     */
    const formatMonth = ('0' + (parseInt(selectedMonth) + 1)).slice(-2);

    await api
      .get(`/appointments_bymonth/${date.year}/${formatMonth}`)
      .then(response => {
        const alreadyTaken = response.data
          .filter(item => item.status != 7) // Enable cancelled appointments dates to be chosen again
          .map(item => {
            return {
              date: item.date,
              day: parseInt(item.date.substring(0, 2)),
              month: parseInt(item.date.substring(3, 5)),
              time: item.time,
              status: item.status,
            };
          });

        /**
         * Add all unappointed work hours to each day, according to default work time
         */
        const addTimeArr = result.filter(item => {
          if (item.d === '20/11/2020') {
            return false;
          }

          item.time = workTime.filter(value => {
            let takenTime = alreadyTaken.filter(time => {
              return time.date === item.d;
            });

            takenTime = takenTime.find(element => element.time === value);

            return takenTime ? false : true;
          });

          if (item.time.length === 0) {
            item = null;
          }

          return item ? true : false;
        });

        setDaysByMonth(addTimeArr);
      });
  };

  const handleSendData = async e => {
    e.preventDefault();

    const vehicle_data = {
      plate: vehicle.plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase(),
      brand: vehicle.brand.toUpperCase(),
      model: vehicle.model.toUpperCase(),
      year: vehicle.year,
      detran: vehicle.detran.toUpperCase(),
      renavam: vehicle.renavam.toUpperCase(),
    };

    setButtonText(<Loader />);

    await api
      .post('/vehicles', vehicle_data)
      .then(response => {
        handleCreateAppointment(response.data.id);
      })
      .catch(error => {
        alert(
          'Ocorreu um erro! Verifique os dados preenchidos. Todos os campos são obrigatórios.',
        );
        setButtonText(`Pagar: R$${total}`);
      });
  };

  const handleCreateAppointment = async vehicle => {
    const appointment_data = {
      vehicle_id: vehicle,
      date: date.day,
      time: date.time,
      category: category.id,
      subcategory: subcategory.id,
      location: location?.id,
      spot: spot.id,
      address: address.address,
      address2: address.address2,
      address_number: address.address_number,
      district: address.district,
      city: address.city,
      uf: address.uf,
      zipcode: address.zipcode,
      payment_method: method.id,
    };

    await api
      .post('/appointments', appointment_data)
      .then(response => {
        history.push({
          pathname: '/process',
          state: { appointment: response.data, email: storage.email, card },
        });
        console.log('erro', response.data);
      })
      .catch(error => {
        setButtonText(`Pagar: R$${total}`);
        console.log('erro', error.response);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    /**
     * Getting user email
     */
    const storage = JSON.parse(localStorage.getItem('@visar-User'));

    setStorage(storage);

    if (!profile) {
      history.push('/');
    }

    /**
     * Fetching default work time to offer
     */
    handleWorkTime();

    /**
     * Handling date to use in appointments
     */
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth();
    const currentDay = d.getDate();
    setDate({ ...date, year: currentYear, currentMonth, currentDay });
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_agendamento.title} />
          <Paragraph text={_agendamento.paragraph} />
        </header>

        <form onSubmit={e => handleSendData(e)}>
          <TextInput
            label="Nº da Autorização de Estampagem ou Chassis do Veículo"
            type="text"
            name="detran"
            required={true}
            placeholder="Autorização do Detran ou Chassis"
            state={vehicle.detran}
            onChange={handleVehicleInput}
          />
          <TextInput
            label="Código RENAVAM"
            type="text"
            name="renavam"
            required={true}
            placeholder="Digite o código do RENAVAM"
            state={vehicle.renavam}
            onChange={handleVehicleInput}
          />
          <TextInput
            label="Placa do veículo"
            type="text"
            name="plate"
            required={true}
            placeholder="Digite a placa do veículo"
            state={vehicle.plate}
            onChange={handleVehicleInput}
          />

          <div className="col2">
            <TextInput
              label="Marca"
              type="text"
              name="brand"
              required={true}
              placeholder="Marca"
              state={vehicle.brand}
              onChange={handleVehicleInput}
            />
            <TextInput
              label="Modelo"
              type="text"
              name="model"
              required={true}
              placeholder="Modelo"
              state={vehicle.model}
              onChange={handleVehicleInput}
            />
          </div>

          <TextInput
            label="Ano de fabricação"
            type="text"
            name="year"
            required={true}
            placeholder="AAAA"
            state={vehicle.year}
            onChange={handleVehicleInput}
          />

          <div style={{ marginTop: 30 }}>
            <DropListMonth
              label="Agendamento"
              name="month"
              required={true}
              placeholder="Escolha um mês"
              currentMonth={date.currentMonth}
              customClass="appointmentInput"
              state={date.month}
              onChange={handleDateInput}
            />
            <DropListDay
              label="Dias disponíveis"
              name="day"
              month={date.month}
              year={date.year}
              required={true}
              placeholder=""
              customClass="appointmentInput"
              days={daysByMonth}
              state={date.day}
              currentMonth={date.currentMonth}
              currentDay={date.currentDay}
              methodDays={method.confirm_days}
              onChange={e => handleDateInput(e, daysByMonth)}
            />
            <DropListTime
              label="Horários disponíveis"
              name="time"
              required={true}
              placeholder=""
              time={selectedDay?.time || workTime}
              customClass="appointmentInput"
              state={date.time}
              onChange={handleDateInput}
            />
          </div>

          <div style={{ marginTop: 30 }}>
            <TextInput
              label="Número do Cartão 💳"
              name="cc_number"
              required={true}
              mask="9999 9999 9999 9999"
              onChange={handleCardInput}
              style={validation.cc_number}
              onBlur={e => emptyMaskValidate(e)}
            />

            <div className="col2">
              <TextInput
                label="Validade"
                name="cc_exp"
                maxlength={5}
                autocomplete="cc-exp"
                required={true}
                // mask="99/99"
                placeholder="MM/YY"
                onChange={handleCardInput}
                style={validation.cc_exp}
                onBlur={e => emptyMaskValidate(e)}
                onKeyUp={e => {
                  var x = e.which || e.keyCode;

                  if (x === 8 || x === 46 || x === 16) {
                    return;
                  }

                  if (
                    e.target.value.length == 2 &&
                    e.target.value.indexOf('/') === -1
                  ) {
                    e.target.value += '/';
                  }
                }}
              />
              <TextInput
                label="CVV"
                name="cc_cvv"
                required={true}
                onChange={handleCardInput}
                style={validation.cc_cvv}
                onBlur={e => emptyMaskValidate(e)}
              />
            </div>

            <TextInput
              label="Nome do titular"
              name="cc_name"
              required={true}
              onChange={handleCardInput}
              style={validation.cc_name}
              onBlur={e => emptyMaskValidate(e)}
            />
          </div>

          <ButtonSuccess text={buttonText} />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default AgendamentoCard;
