const emailvalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordVaild = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
import {VARIABLES} from '../utils/Variables';
import {INSPECTIONS} from '../utils/INSPECTIONS';
import _ from 'lodash';

const IP = 'http://172.20.10.4:5000';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Linking, Alert, Platform} from 'react-native';
import EmailPassWords from '../utils/EmailPassWords';
export const emailChanged = text => {
  return {
    type: 'email_changed',
    payload: text,
  };
};

export const PasswordChanged = text => {
  return {
    type: 'Password_changed',
    payload: text,
  };
};

export const FirstChanged = text => {
  return {
    type: 'First_Changed',
    payload: text,
  };
};

export const SubsquentChanged = text => {
  return {
    type: 'Subsquent_Changed',
    payload: text,
  };
};

export const DealChanged = text => {
  if (text > 10) {
    return {
      type: 'Deal_Error',
      payload: 'No more than 10',
    };
  }
  return {
    type: 'Deal_changed',
    payload: text,
  };
};

export const anChanged = text => {
  if (text.length > 10) {
    return {
      type: 'AN_Error',
      payload: 'INVALID ACCOUNT NUMBER',
    };
  }
  return {
    type: 'AN_changed',
    payload: text,
  };
};

export const annothernameChanged = text => {
  return {
    type: 'annothernameChanged',
    payload: text,
  };
};

export const NameChanged = text => {
  return {
    type: 'Name_changed',
    payload: text,
  };
};

export const AddressChanged = text => {
  return {
    type: 'Address_Changed',
    payload: text,
  };
};

export const TypeChanged = text => {
  return {
    type: 'Type_Changed',
    payload: text,
  };
};

export const CodeChanged = text => {
  return {
    type: 'Code_Changed',
    payload: text,
  };
};

export const SignOut = () => async dispatch => {
  await AsyncStorage.removeItem('loginToken');
  dispatch({type: 'Added', payload: true});
};

export const Fire = ({_id}) => async dispatch => {
  let token = _id;

  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/markerter/app/Delete', {
    token,
  });
  //await AsyncStorage.removeItem('loginToken');

  dispatch({type: 'Added', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const AddReport = (email, machine) => {
  console.log('we here');
  return async dispatch => {
    var sender1 = await AsyncStorage.getItem('loginToken');
    var sender = JSON.parse(sender1);

    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/AddReport', {
      email,
      machine,
      sender,
    });

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const SignUpUser = ({email, password}) => {
  console.log(email, password, 'lol');

  return async dispatch => {
    if (email in EmailPassWords.EmailPassWords) {
      console.log(email, password, 'here');
      console.log(
        EmailPassWords.EmailPassWords[email].password,
        password,
        'hereagain',
      );
      if (EmailPassWords.EmailPassWords[email].password == password) {
        await AsyncStorage.setItem(
          'BossToken',
          JSON.stringify(EmailPassWords.EmailPassWords[email]),
        );
        dispatch({type: 'Login_Done_Boss', payload: true});
      }
    }
  };
};

export const AddMachineBoss = (Name, value, checked, Site, Fuel, Sand) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});

    const res = await axios.post(
      VARIABLES.IP + '/api/Degder/app/AddMachineBoss',
      {
        Name,
        value,
        checked,
        Site,
        Fuel,
        Sand,
      },
    );

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchInfoSiteHistory = prospect => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});

    const res = await axios.post(
      VARIABLES.IP + '/api/Degder/app/FetchInfoSiteHistory',
      {
        prospect,
      },
    );

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};
export const AddStaffBoss = (Name, value, Site) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});

    const res = await axios.post(
      VARIABLES.IP + '/api/Degder/app/AddStaffBoss',
      {
        Name,
        value,
        Site,
      },
    );

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const AddSiteBoss = (Name, value) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});

    const res = await axios.post(VARIABLES.IP + '/api/Degder/app/AddSiteBoss', {
      Name,
      value,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchStaff = () => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchStaff');
  dispatch({type: 'Get_Items', payload: res.data.prospect});
  dispatch({type: 'Get_Sites', payload: res.data.sites});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchMachine = () => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchMachine');
  dispatch({type: 'Get_Items', payload: res.data.prospect});
  dispatch({type: 'Get_Sites', payload: res.data.sites});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchMachineManager = Site => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchMachineManager', {
    Site,
  });
  var Inspections = [];
  res.data.forEach(element => {
    Inspections.push(new Array(INSPECTIONS.length).fill(false));
  });
  dispatch({type: 'Get_Items', payload: res.data});
  dispatch({type: 'Get_Inspections', payload: Inspections});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchMachineGEN = Site => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchMachineGEN', {
    Site,
  });

  dispatch({type: 'Get_Items', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchStaffManager = Site => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchStaffManager', {
    Site,
  });
  dispatch({type: 'Get_Items', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchOperator = OperatorsID => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchOperator', {
    OperatorsID,
  });
  dispatch({type: 'Get_Items', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchSite = () => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchSite');
  dispatch({type: 'Get_Items', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchBreakDown = () => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchBreakDown');
  dispatch({type: 'Get_Items', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const FetchInfo = Person => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchInfo', {Person});
  dispatch({type: 'Get_Person', payload: res.data.prospect});
  dispatch({type: 'Get_Site', payload: res.data.sites});
  dispatch({
    type: 'Sales',
    payload: res.data.prospect.Sales.reverse(),
  });
  dispatch({type: 'Spinner', payload: false});
};

export const fetchShifts = machine => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  console.log(machine, 'machine');

  const res = await axios.post(IP + '/api/Degder/app/fetchShifts', {
    machine,
  });
  var hash = Object.create(null),
    result = res.data.filter(function(o) {
      if (!hash[0]) {
        hash[0] = o.Day;
        return true;
      }
      Array.prototype.push.apply(hash[0], o.Day);
    });

  console.log(result, 'result');

  dispatch({
    type: 'Days',
    payload: result[0].Day,
  });
  dispatch({type: 'Spinner', payload: false});
};

export const FetchMyShifts = machine => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchMyShifts', {
    machine,
  });

  var hash = Object.create(null),
    result = res.data.filter(function(o) {
      if (!hash[0]) {
        hash[0] = o.Day;
        return true;
      }
      Array.prototype.push.apply(hash[0], o.Day);
    });

  console.log(result, 'result');

  dispatch({
    type: 'Days',
    payload: result[0].Day,
  });
  dispatch({type: 'Spinner', payload: false});
};

export const SendBreackDown = (
  Parts,
  Description,
  WorkmanShip,
  Prospect,
  file,
) => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  let data = new FormData();
  console.log(file.uri);
  console.log(Parts, 'Parts');
  console.log(Description, 'Description');
  console.log(WorkmanShip, 'WorkmanShip');
  console.log(Prospect, 'Prospect');
  Parts = JSON.stringify(Parts);
  Prospect = JSON.stringify(Prospect);
  data.append('file', {
    uri: file['uri'],
    type: 'image/jpg',
    name: 'profile-picture.jpg',
  });

  data.append('Parts', Parts);
  data.append('Description', Description);
  data.append('WorkmanShip', WorkmanShip);
  data.append('Prospect', Prospect);
  console.log(data, 'data');
  const res = await axios.post(IP + '/api/Degder/app/SendBreackDown1', data, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  });

  dispatch({type: 'Added', payload: true});

  dispatch({type: 'Spinner', payload: false});
};

export const FetchInfoMan = Person => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchInfoMan', {Person});
  dispatch({type: 'Get_Person', payload: res.data.prospect});
  dispatch({type: 'Get_Site', payload: res.data.sites});
  dispatch({type: 'Reports', payload: res.data.Reports});
  dispatch({type: 'Spinner', payload: false});
};

export const startDay = Person => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/startDay', {Person});
  dispatch({type: 'Get_Site', payload: res.data});

  dispatch({type: 'Spinner', payload: false});
};

export const endDay = (Person, name, Rating) => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/endDay', {
    Person,
    name,
    Rating,
  });

  dispatch({type: 'Get_Site', payload: res.data});

  dispatch({type: 'Spinner', payload: false});
};

export const sendSales = (Sales, person) => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  dispatch({type: 'AddedCahs', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/sendSales', {
    Sales,
    person,
  });
  dispatch({type: 'Get_Person', payload: res.data.prospect});
  dispatch({type: 'Sales', payload: res.data.prospect.Sales.reverse()});
  dispatch({type: 'Get_Site', payload: res.data.sites});
  dispatch({type: 'AddedCahs', payload: false});

  dispatch({type: 'Spinner', payload: false});
};

export const startShiftCah = person => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  dispatch({type: 'AddedCahs', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/startShiftCah', {
    person,
  });
  dispatch({type: 'Get_Person', payload: res.data});
  dispatch({type: 'Sales', payload: res.data.Sales.reverse()});
  dispatch({type: 'AddedCahs', payload: false});
  dispatch({type: 'Spinner', payload: false});
};

export const changeRates = (person, rate) => async dispatch => {
  dispatch({type: 'SpinnerIndex', payload: 1});

  const res = await axios.post(IP + '/api/Degder/app/changeRates', {
    rate,
    person,
  });
  dispatch({type: 'FetchInfoSiteBalance', payload: res.data});
  dispatch({type: 'SpinnerIndexStop', payload: -1});
};

export const finishSession = person => async dispatch => {
  dispatch({type: 'SpinnerIndex', payload: 2});

  const res = await axios.post(IP + '/api/Degder/app/finishSession', {
    person,
  });
  dispatch({type: 'Added', payload: true});
  dispatch({type: 'SpinnerIndexStop', payload: -1});
};

export const AddBa = (person, rate) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'SpinnerIndex', payload: 3});
    const res = await axios.post(IP + '/api/Degder/app/AddBa', {
      person,
      rate,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'FetchInfoSiteBalance', payload: res.data});
    }

    dispatch({type: 'SpinnerIndexStop', payload: -1});
  };
};

export const endShiftCah = (person, name, Rating, target) => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  dispatch({type: 'AddedCahs', payload: true});
  var sums = {};
  var userSelectedColors = [
    'fiveTMoney',
    'tenTMoney',
    'fifteenTMoney',
    'thirtyTMoney',
    'thirtyTtotal',
    'fiveTtotal',
    'Money',
    'tenTtotal',
    'fifteenTtotal',
    'Total',
  ];
  _.each(person.Sales, function(item) {
    _.each(userSelectedColors, function(color) {
      sums[color] = (sums[color] || 0) + item[color];
    });
  });

  console.log(person.Sales, 'person.Sales');
  console.log(sums, 'summed');
  const res = await axios.post(IP + '/api/Degder/app/endShiftCah', {
    person,
    sums,
    name,
    Rating,
    target,
  });
  dispatch({type: 'Get_Person', payload: res.data});
  dispatch({type: 'Sales', payload: res.data.Sales.reverse()});
  dispatch({type: 'AddedCahs', payload: false});
  dispatch({type: 'Spinner', payload: false});
};

export const ChangeScore = ({tot, _id}) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/ChangeScore', {
      tot,
      _id,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const HireingCost = ({tot, Prospect, email, name}) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/HireingCost', {
      tot,
      Prospect,
      email,
      name,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const TransferMachine = ({send, _id}) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/TransferMachine', {
      send,
      _id,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const TransferStaff = ({send, _id}) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/TransferStaff', {
      send,
      _id,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const Comment = ({tot, _id}) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/Comment', {
      tot,
      _id,
    });
    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchInfoSite = Prospect => {
  console.log('we here FetchInfoSite');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/FetchInfoSite', {
      Prospect,
    });
    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Fetch_StieInfo', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchInfoSiteBalance = Prospect => {
  console.log('we here FetchInfoSite');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/FetchInfoSiteBalance', {
      Prospect,
    });
    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'FetchInfoSiteBalance', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchCommentsBOSS = () => async dispatch => {
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchCommentsBOSS', {});
  dispatch({type: 'Fetch_Comments', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const loginUser = ({password}) => {
  return async dispatch => {
    dispatch({type: 'Email_Error', payload: ''});
    dispatch({type: 'Password_Error', payload: ''});
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/loginemail', {
      password,
    });
    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_User', payload: res.data});
      if (res.data.Code.slice(0, 3) == 'GEN') {
        await AsyncStorage.setItem('loginToken', JSON.stringify(res.data));
        dispatch({type: 'Login_Done', payload: res.data._id});
      } else if (res.data.Code.slice(0, 3) == 'CAS') {
        await AsyncStorage.setItem('CASToken', JSON.stringify(res.data));
        dispatch({type: 'CAS_Done', payload: res.data._id});
      } else if (res.data.Code.slice(0, 3) == 'MAN') {
        await AsyncStorage.setItem('MANToken', JSON.stringify(res.data));
        dispatch({type: 'MAN_Done', payload: res.data._id});
      }
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const costChanged = text => {
  return {
    type: 'cost_Changed',
    payload: text,
  };
};

export const logincheck = () => async dispatch => {
  //await AsyncStorage.removeItem('CASToken');
  let token = await AsyncStorage.getItem('BossToken');
  let token2 = await AsyncStorage.getItem('loginToken');
  let token3 = await AsyncStorage.getItem('CASToken');
  let token4 = await AsyncStorage.getItem('MANToken');

  if (token) {
    setTimeout(() => {
      dispatch({type: 'Login_Done_Boss', payload: token});
    }, 1500);
  } else if (token2) {
    setTimeout(() => {
      dispatch({type: 'Login_Done', payload: token});
    }, 1500);
  } else if (token3) {
    setTimeout(() => {
      dispatch({type: 'CAS_Done', payload: token});
    }, 1500);
  } else if (token4) {
    setTimeout(() => {
      dispatch({type: 'MAN_Done', payload: token});
    }, 1500);
  } else {
    setTimeout(() => {
      dispatch({type: 'Login_NO', payload: null});
    }, 3000);
  }
};

export const AddPayment = ({name, AN, value}) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginToken');
    var _id = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/AddPayment', {
      name,
      AN,
      value,
      _id: _id._id,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const AddOperator = (staff, machine) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('MANToken');
    var go = false;
    if (token) {
      go = true;
    }
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/AddOperator', {
      staff,
      machine,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added2', payload: go});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const RequestBA = (amount, manager, Report) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/RequestBA', {
      amount,
      manager,
      Report,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added2', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const SetRates = (five, ten, fiftenn, thirty, manager) => {
  console.log('we here');

  return async dispatch => {
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/SetRates', {
      five,
      manager,
      ten,
      fiftenn,
      thirty,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Site', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const RemoveOperator = (staff, machine) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('MANToken');
    var go = false;
    if (token) {
      go = true;
    }
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/RemoveOperator', {
      staff,
      machine,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added2', payload: go});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const startShift = (item, index2, name) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginToken');

    token = JSON.parse(token);

    dispatch({type: 'SpinnerIndex', payload: index2});
    const res = await axios.post(IP + '/api/Degder/app/startShift', {
      token,
      item,
      name,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
      dispatch({type: 'SpinnerIndexStop', payload: index2});
    }

    // dispatch({type: 'Spinner', payload: false});
  };
};

export const stopShift = (item, index2, name, Rating, target) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginToken');

    token = JSON.parse(token);

    dispatch({type: 'SpinnerIndex', payload: index2});
    const res = await axios.post(IP + '/api/Degder/app/stopShift', {
      token,
      item,
      name,
      Rating,
      target,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
      dispatch({type: 'SpinnerIndexStop', payload: index2});
    }

    // dispatch({type: 'Spinner', payload: false});
  };
};

export const startMachine = (item, index2) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginToken');

    token = JSON.parse(token);

    dispatch({type: 'SpinnerIndex', payload: index2});
    const res = await axios.post(IP + '/api/Degder/app/startMachine', {
      token,
      item,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
      dispatch({type: 'SpinnerIndexStop', payload: index2});
    }

    // dispatch({type: 'Spinner', payload: false});
  };
};

export const stopMachine = (item, index2) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginToken');

    token = JSON.parse(token);

    dispatch({type: 'SpinnerIndex', payload: index2});
    const res = await axios.post(IP + '/api/Degder/app/stopMachine', {
      token,
      item,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Items', payload: res.data});
      dispatch({type: 'SpinnerIndexStop', payload: index2});
    }

    // dispatch({type: 'Spinner', payload: false});
  };
};

export const verifyreprot = (index2, Person) => async dispatch => {
  dispatch({type: 'SpinnerIndex', payload: index2});
  console.log(index2, 'index');

  const res = await axios.post(IP + '/api/Degder/app/verifyreprot', {Person});

  dispatch({type: 'Reports', payload: res.data});
  dispatch({type: 'SpinnerIndexStop', payload: index2});
};

export const AddRequest = ({name, email, tot, type}) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('BossToken');
    let token2 = await AsyncStorage.getItem('loginToken');
    let token3 = await AsyncStorage.getItem('CASToken');
    let token4 = await AsyncStorage.getItem('MANToken');

    if (token) {
      token = JSON.parse(token);
    } else if (token2) {
      token = JSON.parse(token2);
    } else if (token3) {
      token = JSON.parse(token3);
    } else if (token4) {
      token = JSON.parse(token4);
    }

    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/AddRequest', {
      name,
      email,
      tot,
      type,
      token,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const sendInspection = (Rating, Report) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('MANToken');

    token = JSON.parse(token);

    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(IP + '/api/Degder/app/sendInspection', {
      Rating,
      Report,
      token,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Added', payload: true});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchComments = StoreId => async dispatch => {
  let token = await AsyncStorage.getItem('BossToken');
  let token2 = await AsyncStorage.getItem('loginToken');
  let token3 = await AsyncStorage.getItem('CASToken');
  let token4 = await AsyncStorage.getItem('MANToken');

  if (token) {
    token = JSON.parse(token);
  } else if (token2) {
    token = JSON.parse(token2);
  } else if (token3) {
    token = JSON.parse(token3);
  } else if (token4) {
    token = JSON.parse(token4);
  }
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(IP + '/api/Degder/app/FetchComments', {
    token,
  });
  dispatch({type: 'Fetch_Comments', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};
