import request from '../utils/request';

export function patchQuestionList(values) {
  console.log('values---------',values);
  return request('http://192.168.102.107:14500/Oper/get_questions_pager', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
