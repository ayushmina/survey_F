import Agent from "./superAgent";
import config from '../config/configg';
import {ServerError} from './helper';
const BACKEND_URL = config.BACKEND_URL;

function getsurvey(payload, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/getsurvey`)
    .query(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function getSurveyById(id, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/getSurveyById/${id}`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function addPost(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/createSurvey`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function updateSurvey(payload, cb) {
  Agent
    .fire('post',`${BACKEND_URL}/updateSurvey`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function DeleteSurvey(id, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/DeleteSurvey`)
    .send(id)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function responseCreate(id, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/responseCreate`)
    .send(id)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function myResponse(text, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/myResponse`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}


export default {
  getsurvey,
  getSurveyById,
  addPost,
  DeleteSurvey,
  myResponse,
  responseCreate,
  updateSurvey,
  

}