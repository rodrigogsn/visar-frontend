import React, { useState, useEffect } from "react";
import moment from "moment";
import Style from "../../styles/Admin";
import { Loader } from "./../../components/Elements";

import Appointments from "./Appointments";
import Users from "./Users";
import Header from "./../../components/Admin/Header";
import Sidebar from "./../../components/Admin/Sidebar";
import menu from "./../../components/Admin/menu.json";

import {
  AppointmentColumns,
  UserColumns,
} from "./../../components/Admin/Columns";

import api from "./../../services/api";

const Dashboard = () => {
  const [page, setPage] = useState(0);

  const [users, setUsers] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [todayList, setTodayList] = useState([]);

  const [tomorrowList, setTomorrowList] = useState([]);

  const [loader, setLoader] = useState({ loading: false, icon: <Loader /> });

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
    setLoader({ ...loader, loading: true });

    api
      .get("/appointments")
      .then((response) => {
        setLoader({ ...loader, loading: false });

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
        setLoader({ ...loader, loading: false });

        alert("Ocorreu um erro");
      });
  };

  const handleUsers = () => {
    setLoader({ ...loader, loading: true });

    api
      .get("/users")
      .then((response) => {
        setLoader({ ...loader, loading: false });

        setUsers(response.data);
      })
      .catch(() => {
        setLoader({ ...loader, loading: false });

        alert("Ocorreu um erro");
      });
  };

  useEffect(() => {
    handleAppointments();

    handleUsers();
  }, []);

  return (
    <Style>
      <div>
        <Header
          title={menu[page].name}
          action={handleAppointments}
          loader={loader}
          buttonText={"Atualizar"}
        />

        <section className="dashboard">
          <Sidebar menu={menu} page={page} setPage={setPage} />

          <main className="dashboard">
            {page === menu[0].id && (
              <Appointments
                columns={AppointmentColumns}
                all={appointments}
                today={todayList}
                tomorrow={tomorrowList}
              />
            )}

            {page === menu[1].id && (
              <Users columns={UserColumns} users={users} />
            )}
          </main>
        </section>

        <footer />
      </div>
    </Style>
  );
};

export default Dashboard;
