import moment from "moment";
import "regenerator-runtime/runtime";

window.DataStore = function () {
  let DOB = null;
  let CAREER_START = null;
  const NUMBER_STRINGS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  let CONTACT_NUMBER = null;
  let EMAIL = null;
  let LOCATION = null;
  let CV_PATH = null;
  let CERTIFICATION_ANIMATION_SPEED = "15s";
  let AGE = null;
  let EXPERIENCE = null;
  let EXPERIENCE_FORMATTED = null;

  var getJSON = function (url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "json";
      xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status, xhr.response);
        }
      };
      xhr.send();
    });
  };
  let data = {};
  this.init = async function () {
    let res = await getJSON("./js/data.json");
    DOB = new Date(res.DOB);
    CAREER_START = new Date(res.CAREER_START);
    CONTACT_NUMBER = res.CONTACT_NUMBER;
    EMAIL = res.EMAIL;
    LOCATION = res.LOCATION;
    CV_PATH = res.CV_PATH;
    CERTIFICATION_ANIMATION_SPEED = res.CERTIFICATION_ANIMATION_SPEED;
    AGE = moment().diff(moment(DOB), "y", false);
    EXPERIENCE = moment().diff(moment(CAREER_START), "y", false);
    EXPERIENCE_FORMATTED = EXPERIENCE < 10 ? NUMBER_STRINGS[EXPERIENCE] : EXPERIENCE.toString();
    data = res.data;

    data.Description = eval(data.Description);
    data.AboutMe = eval(data.AboutMe);
    data.Skills.FrontEnd.caption = eval(data.Skills.FrontEnd.caption);
    data.Skills.Backend.caption = eval(data.Skills.Backend.caption);
  };

  this.get_age = () => AGE;
  this.get_experience = (formatted) => (formatted ? EXPERIENCE_FORMATTED : EXPERIENCE > 10 ? EXPERIENCE : `0${EXPERIENCE}`);
  this.get_location = () => LOCATION;
  this.get_data = (key) => data[key];
  this.get_contact = () => CONTACT_NUMBER;
  this.get_email = () => EMAIL;
  this.get_cv = () => CV_PATH;
  this.get_socialLinks = () => data.SocialLinks.filter((a) => a.active).sort((a, b) => a.order - b.order);
  this.getCertificationSpeed = () => CERTIFICATION_ANIMATION_SPEED;
};
