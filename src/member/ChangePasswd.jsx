import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { API_BASE_URL } from "../common/ApiConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Captcha from './Captcha';

const ChangePasswd = () => {
  const [pwdPop, setPwdPop] = useState("새 비밀번호 확인");
  const { email } = useParams();
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const data = useLocation();
  let sendData = {};

  const checkPwd = (e) => {

    const pwdVal = document.getElementById("floatingPassword").value;
    if (e.target.value === pwdVal) {
      return setPwdPop("비밀번호가 일치합니다");
    } else {
      return setPwdPop("비밀번호가 일치하지 않습니다.");
    }
  };

  const changeNewPwd = () => {
    if (email) {
      sendData = {
        preId: email,
        prePwd: document.getElementById("sendingPassword").value,
        newPwd: document.getElementById("floatingPassword").value,
        newPwdChk: document.getElementById("floatingPasswordCK").value
      }
    } else {
      sendData = {
        preId: data.state.data,
        prePwd: document.getElementById("sendingPassword").value,
        newPwd: document.getElementById("floatingPassword").value,
        newPwdChk: document.getElementById("floatingPasswordCK").value
      }
    }
    axios({
      method: "POST",
      url: API_BASE_URL + "/myInfo/ChangePasswd",
      headers: {
        "Content-Type": "application/json",
      },
      data: sendData
    })
      .then((response) => {
        window.location.href = "/login";
      })
  };
  return (
    <div className="container-sm">
      <div class="g-3">
        <div class="col-sm-4">
          <h3 className="mb-5">비밀번호 변경</h3>
          <div class="form-floating">
            <input
              type="id"
              class="form-control mb-3"
              id="sendingId"
              placeholder="아이디"
              style={{ display: email ? "block" : "none" }}
              value={email}
              readOnly
            />
            <label
              style={{ display: email ? "block" : "none" }}
              for="sendingId">아이디</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control mb-3"
              id="sendingPassword"
              placeholder="현재 비밀번호"
            />
            <label for="sendingPassword">현재 비밀번호</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control mb-3"
              id="floatingPassword"
              placeholder="새 비밀번호"
            />
            <label for="floatingPassword">새 비밀번호</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control mb-5"
              id="floatingPasswordCK"
              onChange={checkPwd}
              placeholder={pwdPop}
            />
            <label for="floatingPasswordCK">{pwdPop}</label>
          </div>
          <div className='mb-5'>
            <Captcha setConfirm={setConfirm} confirm={confirm}></Captcha>
          </div>
          <div class="d-grid gap-2">
            <button
              class="btn btn-outline-warning btn-lg"
              onClick={changeNewPwd}
              type="button"
            >
              확인
            </button>
            <button class="btn btn-outline-warning btn-lg" type="button"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  );
};

export default ChangePasswd;
