import React, { useState, useEffect } from "react";
import moment from "moment";

import { Loader } from "./../../components/Elements";

import Style from "../../styles/Admin";

import Header from "./../../components/Admin/Header";
import Sidebar from "./../../components/Admin/Sidebar";
import Table from "./../../components/Admin/Table";
import { Appointments } from "./../../components/Admin/Columns";
import menu from "./../../components/Admin/menu.json";

import api from "./../../services/api";

const Dashboard = () => {
  const [page, setPage] = useState(0);

  const [appointments, setAppointments] = useState([]);

  const [todayList, setTodayList] = useState([]);

  const [tomorrowList, setTomorrowList] = useState([]);

  const [updateButtonText, setUpdateButtonText] = useState("Atualizar");

  // const [toggleScreen, setToggleScreen] = useState(false);

  const handleFilter = (data, day) => {
    const result = data.filter((e) => e.date === day && e.status);

    const sort = result.sort(function (a, b) {
      let timeA = a.time;
      let timeB = b.time;

      if (timeA < timeB) {
        return -1;
      }

      if (timeA > timeB) {
        return 1;
      }

      return 0;
    });

    return sort;
  };

  const handleNextWorkday = () => {
    const weekday = moment().day();

    switch (weekday) {
      case 5:
        var next = 3;
        break;
      case 6:
        var next = 2;
        break;
      default:
        var next = 1;
    }

    return next;
  };

  const handleAppointments = () => {
    setUpdateButtonText(<Loader />);

    api
      .get("/appointments")
      .then((response) => {
        setUpdateButtonText("Atualizar");

        setAppointments(response.data);

        // Filter current day
        const today = moment().format("DD/MM/YYYY");

        const filterToday = handleFilter(response.data, today);

        setTodayList(filterToday);

        // Filter next working day
        const tomorrow = moment()
          .add(handleNextWorkday(), "days")
          .format("DD/MM/YYYY");

        const filterTomorrow = handleFilter(response.data, tomorrow);

        setTomorrowList(filterTomorrow);
      })
      .catch(() => {
        setUpdateButtonText("Atualizar");

        alert("Ocorreu um erro");
      });
  };

  useEffect(() => {
    handleAppointments();
  }, []);

  return (
    <Style>
      <div>
        <Header
          title={menu[0].name}
          buttonAction={handleAppointments}
          buttonText={updateButtonText}
        />

        <section className="dashboard">
          <Sidebar menu={menu} page={page} setPage={setPage} />

          <main className="dashboard">
            {page === menu[0].id && (
              <>
                <h2>Hoje</h2>

                {todayList.length !== 0 ? (
                  <Table columns={Appointments} data={todayList} />
                ) : (
                  <span className="empty">Sem agendamentos ainda.</span>
                )}

                <h2>Próximo dia útil</h2>

                {tomorrowList.length !== 0 ? (
                  <Table columns={Appointments} data={tomorrowList} />
                ) : (
                  <span className="empty">Sem agendamentos ainda.</span>
                )}

                <h2>Todos</h2>

                <Table columns={Appointments} data={appointments} />
              </>
            )}
          </main>
        </section>

        <footer />
      </div>
    </Style>
  );
};

export default Dashboard;
