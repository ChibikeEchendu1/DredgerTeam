import _ from 'lodash';
import {INSPECTIONS} from '../utils/INSPECTIONS';

const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  address: '',
  tot: '',
  type: '',
  Companies: [],
  Code: '',
  cost: '',
  EmailError: '',
  PasswordError: '',
  user: {},
  NameError: '',
  deal: '',
  ANError: '',
  Reports: [],
  days: [],
  balance: {Balance: 0, OperatingMoney: 0, Funds: 0},
  inspections2: new Array(INSPECTIONS.length).fill(false),
  inspections: [[]],
  AN: '',
  DealError: '',
  items: [],
  sites: [],
  Sales: [],
  subsequent: '',
  first: '',
  Profile: {},
  Loader: false,
  Added: false,
  AddedCahs: false,
  Comments: {
    Items: [],
    Valies: [],
    requesr: [],
    bug: [],
  },

  sitesinfo: {
    machines: [],
    staff: [],
  },
  site: {
    Day: [],
    DayON: false,
    Session: [],
  },
  logedinMAN: false,
  logedinCAS: false,
  person: {On: false},
  index2: -1,
  stats: {Scores: [0, 0, 0, 0, 0, 0], Balances: [0, 0, 0, 0, 0, 0]},
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case 'Login_Done':
      return {...state, logedin: true};
    case 'CAS_Done':
      return {...state, logedinCAS: true};
    case 'MAN_Done':
      return {...state, logedinMAN: true};
    case 'Login_Done_Boss':
      return {...state, logedinBoss: true};
    case 'Code_Changed':
      return {...state, Code: action.payload};
    case 'Fetch_Companies':
      return {...state, Companies: action.payload};
    case 'Fetch_Profie':
      return {...state, Profile: action.payload};
    case 'Login_NO':
      return {...state, new: true};
    case 'item_clered':
      return {...state, items: []};
    case 'Add_Item':
      return {...state, items: [action.payload, ...state.items]};
    case 'Item_remove':
      return {
        ...state,
        items: state.items.filter((item, i) => i != action.payload),
      };
    case 'Item_changed':
      return {...state, itemName: action.payload};
    case 'Fetch_Comments':
      return {...state, Comments: action.payload};
    case 'Fetch_StieInfo':
      return {...state, sitesinfo: action.payload};
    case 'FetchInfoSiteBalance':
      return {...state, balance: action.payload, password: '', Code: ''};
    case 'Fetch_Stats':
      return {...state, stats: action.payload};
    case 'Quan_changed':
      return {...state, Quan: action.payload};
    case 'Size_changed':
      return {...state, Size: action.payload};
    case 'Size_Error':
      return {...state, SizeError: action.payload};
    case 'Quan_Error':
      return {...state, QuanError: action.payload};
    case 'Item_Error':
      return {...state, ItemError: action.payload};
    case 'email_changed':
      return {...state, email: action.payload};
    case 'cost_Changed':
      return {...state, cost: action.payload};
    case 'Password_changed':
      return {...state, password: action.payload};

    case 'First_Changed':
      return {...state, first: action.payload};
    case 'Subsquent_Changed':
      return {...state, subsequent: action.payload};
    case 'Deal_changed':
      return {...state, deal: action.payload, DealError: ''};

    case 'AN_changed':
      return {...state, AN: action.payload, ANError: ''};

    case 'Name_changed':
      return {...state, name: action.payload};
    case 'Address_changed':
      return {...state, place: action.payload};

    case 'annothernameChanged':
      return {...state, tot: action.payload};
    case 'Type_Changed':
      return {...state, type: action.payload};

    case 'Added':
      return {...state, Added: action.payload};
    case 'AddedCahs':
      return {...state, AddedCahs: action.payload};
    case 'Added2':
      return {...state, Added: true, go: action.payload};
    case 'Email_Error':
      return {...state, EmailError: action.payload};
    case 'Deal_Error':
      return {...state, DealError: action.payload};
    case 'AN_Error':
      return {...state, ANError: action.payload};

    case 'Password_Error':
      return {...state, PasswordError: action.payload};

    case 'Name_Error':
      return {...state, NameError: action.payload};
    case 'Spinner':
      return {...state, Loader: action.payload};
    case 'SpinnerIndex':
      return {...state, index2: action.payload};
    case 'SpinnerIndexStop':
      return {...state, index2: -1};

    case 'Get_User':
      return {...state, user: action.payload};
    case 'Get_Items':
      return {...state, items: action.payload};
    case 'Sales':
      return {...state, Sales: action.payload};
    case 'Days':
      return {...state, days: action.payload};
    case 'Reports':
      return {...state, Reports: action.payload};

    case 'Get_Inspections':
      return {...state, inspections: action.payload};
    case 'Get_Sites':
      return {...state, sites: action.payload};
    case 'Get_Person':
      return {...state, person: action.payload};
    case 'Get_Site':
      return {...state, site: action.payload};
    default:
      return state;
  }
};
