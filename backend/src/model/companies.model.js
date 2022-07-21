const random = require('random');
const { Company } = require('../../models/index');
const { sum, sub } = require('../utils/arithmetic');
const timeStocksModel = require('./timeStocks.model');

require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const COMPANY_LIST1 = [

];

const COMPANY_LIST = [
  // {
  //   name: 'A',
  //   fullName: 'Agilent Technologies Inc',
  // },
  // {   name: 'AA',
  //   fullName: 'Alcoa Corp',
  // },
  // {
  //   name: 'AAC',
  //   fullName: 'Ares Acquisition Corp',
  // },

  // }, {
  //   name: 'AAN',
  //   fullName: "Aaron's Company Inc",
  // }, {
  //   name: 'AAOI',
  //   fullName: 'Applied Optoeletronics Inc',
  // }, {
  //   name: 'AAON',
  //   fullName: 'Aaon Inc',
  {
    name: 'AAPL',
    fullName: 'Apple',
  // }, {
  //   name: 'AAT',
  //   fullName: 'American Assets Trust Inc',
  // }, {
  //   name: 'AAU',
  //   fullName: 'Almaden Minerals LTD',
    // }, {
  //   name: 'AB',
  //   fullName: 'AllianceBernstein Holding LP',
  // }, {
  //   name: 'ABB',
  //   fullName: 'ABB LTD',
  // }, {
  //   name: 'ABBV',
  //   fullName: 'AbbVie',
  // }, {
  //   name: 'ABCB',
  //   fullName: 'Ameris Bancorop',
  // }, {
  //   name: 'ABC',
  //   fullName: 'Amerisourcebergen Corp',
  // }, {
  //   name: 'ABEO',
  //   fullName: 'Abeona Therapeutics Inc',
  }, {
    name: 'ABEV',
    fullName: 'Ambev',
    // }, {
    //   name: 'ABG',
    //   fullName: 'Asbury Automative Group Inc',
    // }, {
    //   name: 'ABIO',
    //   fullName: 'Arca Biofarma Inc',
    // }, {
    //   name: 'ABM',
    //   fullName: 'ABM Industries Inc',
    // }, {
    //   name: 'ABMD',
    //   fullName: 'ABIOMED Inc',
    // }, {
    //   name: 'ABR',
    //   fullName: 'Arbor Realty Trust Inc',
  }, {
    name: 'ABT',
    fullName: 'Abbott Laboratories',
  // }, {
  //   name: 'ABUS',
  //   fullName: 'Arbutus Biopharma Corp',
  // }, {
  //   name: 'ACAD',
  //   fullName: 'ACADIA Pharmaceuticals Inc',
  // }, {
  //   name: 'ACC',
  //   fullName: 'American Campus Communities Inc',
  // }, {
  //   name: 'ACCO',
  //   fullName: 'ACCO Brands Corp',
  }, {
    name: 'ACER',
    fullName: 'Acer Therapeutics Inc',
  // }, {
  //   name: 'ACGL',
  //   fullName: 'Arch Capital Group LTD',
  // }, {
  //   name: 'ACH',
  //   fullName: 'Aluminium Corporation of China Ltd',
  // }, {
  //   name: 'ACHC',
  //   fullName: 'Acadia Healthcare Company Inc',
  // }, {
  //   name: 'ACHV',
  //   fullName: 'Achieve Life Sciences Inc',
  // }, {
  //   name: 'ACIW',
  //   fullName: 'ACI Worldwide Inc',
  // }, {
  //   name: 'ACLS',
  //   fullName: 'Axcelis Technologies Inc',
  // }, {
  //   name: 'ACM',
  //   fullName: 'AECOM',
  }, {
    name: 'ACN',
    fullName: 'Accenture',
  // }, {
  //   name: 'ACNB',
  //   fullName: 'ACNB Corp',
  // }, {
  //   name: 'ACOR',
  //   fullName: 'Acorda Therapeutics Inc',
  // }, {
  //   name: 'ACP',
  //   fullName: 'abrdn Income Credit Strategies Fund',
  // }, {
  //   name: 'ACRE',
  //   fullName: 'Ares Commercial Real State Corp',
  // }, {
  //   name: 'ACRX',
  //   fullName: 'AcelRx Pharmaceuticals Inc',
  // }, {
  //   name: 'ACST',
  //   fullName: 'Acasti Pharma Inc',
  // }, {
  //   name: 'ACTG',
  //   fullName: 'Acacia Research Group',
  }, {
    name: 'ACU',
    fullName: 'Acme United Corp',
  // }, {
  //   name: 'ACXM',
  //   fullName: 'Alcoa Corp',
  }, {
    name: 'ADBE',
    fullName: 'Adobe',
  // }, {
  //   name: 'ADC',
  //   fullName: 'Agree Realty Corp',
  // }, {
  //   name: 'ADI',
  //   fullName: 'Analog Devices Inc',
  // }, {
  //   name: 'ADM',
  //   fullName: 'Archland-Daniels-Midland Co',
  // }, {
  //   name: 'ADMA',
  //   fullName: 'ADMA Biologics Inc',
  // }, {
  //   name: 'ADMP',
  //   fullName: 'Adami Pharmaceuticals ',
  }, {
    name: 'ADP',
    fullName: 'Automatic Data Processing Inc',
  // }, {
  //   name: 'ADTN',
  //   fullName: 'ADTRAN Holdings Inc',
  // }, {
  //   name: 'ADUS',
  //   fullName: 'Addus Homecare Corp',
  // }, {
  //   name: 'ADX',
  //   fullName: 'Adams Diversified Equity Fund',
  // }, {
  //   name: 'ADXS',
  //   fullName: 'Advaxis Inc',
  // }, {
  //   name: 'AE',
  //   fullName: 'Adams Resource and Energy Inc',
  // }, {
  //   name: 'AEE',
  //   fullName: 'Ameren Corp',
  // }, {
  //   name: 'AEG',
  //   fullName: 'Aegon NV',
  // }, {
  //   name: 'AEHR',
  //   fullName: 'Aehr Test Systems',
  // }, {
  //   name: 'AEL',
  //   fullName: 'American Equity Investment Life Holding Co',
  // }, {
  //   name: 'AEM',
  //   fullName: 'Agnico Eagle Mines LTD',
  //  }, {
  //    name: 'AEO',
  //    fullName: 'American Eagle Outfitters Inc',
  // }, {
  //   name: 'AEP',
  //   fullName: 'American Electric Power Inc',
  // }, {
  //   name: 'AER',
  //   fullName: 'AerCap Holdings NV',
  // }, {
  //   name: 'AERI',
  //   fullName: 'Aerie Pharmaceuticals Inc',
  // }, {
  //   name: 'AES',
  //   fullName: 'AES Corp',
  // }, {
  //   name: 'AEY',
  //   fullName: 'ADDvantage Technologies Group Inc',
  // }, {
  //   name: 'AEZS',
  //   fullName: 'Aeterna Zentaris Inc',
  // }, {
  //   name: 'AFB',
  //   fullName: 'AllianceBernstein National Municipal Income Fund',
  // }, {
  //   name: 'AFG',
  //   fullName: 'American Financial Group Inc',
  // }, {
  //   name: 'AFGE',
  //   fullName: 'American Financial Group Inc',
  // }, {
  //   name: 'AFL',
  //   fullName: 'Aflac Inc',
  // }, {
  //   name: 'AFMD',
  //   fullName: 'Affimed NV',
  // }, {
  //   name: 'AFT',
  //   fullName: 'Apollo Senior Floating Rate Fund',
  // }, {
  //   name: 'AG',
  //   fullName: 'First Majestic Silver Corp',
  // }, {
  //   name: 'AGCO',
  //   fullName: 'AGCO Corpo',
  // }, {
  //   name: 'AGD',
  //   fullName: 'abrdn Global Dynamic Dividend Fund',
  // }, {
  //   name: 'AGEN',
  //   fullName: 'Agenus Inc',
  // }, {
  //   name: 'AGFS',
  //   fullName: 'AgroFresh Solutions Inc',
  // }, {
  //   name: 'AGI',
  //   fullName: 'Alamos Gold Inc',
  // }, {
  //   name: 'AGIO',
  //   fullName: 'Agios Pharmaceutical Inc',
  // }, {
  //   name: 'AGM',
  //   fullName: 'Federal Agricultural Mortgage Corp',
  // }, {
  //   name: 'AGNC',
  //   fullName: 'AGNC Investment Corp',
  // }, {
  //   name: 'AGO',
  //   fullName: 'Assured Guranty Ltd',
  // }, {
  //   name: 'AGRO',
  //   fullName: 'Adecoagro SA',
  // }, {
  //   name: 'AGX',
  //   fullName: 'Agile Therapeutics Inc',
  // }, {
  //   name: 'AGYS',
  //   fullName: 'Agylysis Inc',
  // }, {
  //   name: 'AHPI',
  //   fullName: 'Allied Healthcare Products Inc',
  // }, {
  //   name: 'AHT',
  //   fullName: 'Ashford Hospitality Trust Inc',
  }, {
    name: 'AI',
    fullName: 'C3.ai Inc',
  // }, {
  //   name: 'AIF',
  //   fullName: 'Apollo Tactical Income Fund',
  // }, {
  //   name: 'AIG',
  //   fullName: 'AIG',
  // }, {
  //   name: 'AIMC',
  //   fullName: 'Altra Industrial Motion Corp',
  // }, {
  //   name: 'AIN',
  //   fullName: 'Albany International Corp',
  // }, {
  //   name: 'AINC',
  //   fullName: 'Ashford Inc',
  // }, {
  //   name: 'AINV',
  //   fullName: 'Apollo Investment Corp',
  // }, {
  //   name: 'AIR',
  //   fullName: 'AAR Corp',
  // }, {
  //   name: 'AIRI',
  //   fullName: 'Air Industries Group',
  // }, {
  //   name: 'AIRT',
  //   fullName: 'Air T Inc',
  // }, {
  //   name: 'AIT',
  //   fullName: 'Applied Industries Technologies Inc',
  }, {
    name: 'AIV',
    fullName: 'Apartment Investment and Management Co',
  // }, {
  //   name: 'AIZ',
  //   fullName: 'Assurant Inc',
  }, {
    name: 'AJG',
    fullName: 'Arthur J. Gallagher & Co.',
  // }, {
  //   name: 'AJRD',
  //   fullName: 'Aerojet Rocketdyne Holdings Inc',
  // }, {
  //   name: 'AJX',
  //   fullName: 'Great Ajax Corp',
    // }, {
    //   name: 'AKAM',
    //   fullName: 'Akamai Technologies Inc',
    // }, {
    // name: 'AKBA',
    // fullName: 'Akebia Therapeutics Inc',
  // }, {
  //   name: 'AKO-A',
  //   fullName: 'Embotelladora Andina SA',
  // }, {
  //   name: 'AKO-B',
  //   fullName: 'Embotelladora Andina SA',
  // }, {
  //   name: 'AKR',
  //   fullName: 'Akadia Realty Test',
  // }, {
  //   name: 'AKTX',
  //   fullName: 'Akari Therapeutics PLC',
  // }, {
  //   name: 'AL',
  //   fullName: 'Air Lease Corp',
  // }, {
  //   name: 'ALB',
  //   fullName: 'Albermarle Corp',
  // }, {
  //   name: 'ALE',
  //   fullName: 'ALLETE Inc',
  // }, {
  //   name: 'ALG',
  //   fullName: 'Alamo Group Inc',
  // }, {
  //   name: 'ALK',
  //   fullName: 'Alaska Air Group Inc',
  // }, {
  //   name: 'ALL',
  //   fullName: 'Allstate',
  // }, {
  //   name: 'ALT',
  //   fullName: 'Altimmune Inc',
  // }, {
  //   name: 'ALV',
  //   fullName: 'Autoliv Inc',
  // }, {
  //   name: 'ALX',
  //   fullName: 'Alexander\'s Inc',
  // }, {
  //   name: 'AM',
  //   fullName: 'Antero Midstream Corp',
  }, {
    name: 'AMD',
    fullName: 'Advanced Micro Devices Inc',
  // }, {
  //   name: 'AME',
  //   fullName: 'AMETEK Inc',
  // }, {
  //   name: 'AMG',
  //   fullName: 'Affiliated Managers Group Inc',
  // }, {
  //   name: 'AMH',
  //   fullName: 'American Homes 4 Rent',
  // }, {
  //   name: 'AMN',
  //   fullName: 'AMN Healthcare Services',
  // }, {
  //   name: 'AMP',
  //   fullName: 'Ameriprise Financial Inc',
  // }, {
  //   name: 'AMS',
  //   fullName: 'American Shared Hospital Services',
  // }, {
  //   name: 'AMT',
  //   fullName: 'American Tower',
  // }, {
  //   name: 'AMX',
  //   fullName: 'American Movil SAB de CV',
  }, {
    name: 'AMZN',
    fullName: 'Amazon',
  // }, {
  //   name: 'AN',
  //   fullName: 'AutoNation Inc',
  }, {
    name: 'ANF',
    fullName: 'Abercrombie & Fitch Co',
  // }, {
  //   name: 'ANY',
  //   fullName: 'Sphere 3D Corp',
  // }, {
  //   name: 'AOD',
  //   fullName: 'abrdn Total Dynamic Dividend Fund',
  // }, {
  //   name: 'AON',
  //   fullName: 'Aon PLC',
  // }, {
  //   name: 'AOS',
  //   fullName: 'A O  Smith Corp',
  // }, {
  //   name: 'AP',
  //   fullName: 'Ampco-Pittsburgh Corp',
  // }, {
  //   name: 'APA',
  //   fullName: 'APA Corp (US)',
  // }, {
  //   name: 'APD',
  //   fullName: 'Air Products and Chemicals Inc',
  // }, {
  //   name: 'APH',
  //   fullName: 'Amphenol Corp',
  // }, {
  //   name: 'APO',
  //   fullName: 'Apollo Global Management Inc',
  // }, {
  //   name: 'APT',
  //   fullName: 'Alpha Pro Tech LTD',
  // }, {
  //   name: 'AR',
  //   fullName: 'Antero Resources Corp',
  // }, {
  //   name: 'ARC',
  //   fullName: 'ARC Document Solutions Inc',
  // }, {
  //   name: 'ARE',
  //   fullName: 'Alexandria Real Estate Equities Inc',
  // }, {
  //   name: 'ARI',
  //   fullName: 'Apollo Commercial Real Estate Finance Inc',
  // }, {
  //   name: 'ARL',
  //   fullName: 'American Realty Investors Inc',
  // }, {
  //   name: 'ARR',
  //   fullName: 'ARMOUR Residential REIT Inc',
  // }, {
  //   name: 'ASA',
  //   fullName: 'ASA Gold and Precious Metals Limited',
  // }, {
  //   name: 'ASB',
  //   fullName: 'Associated Banc-Corp',
  // }, {
  //   name: 'ASG',
  //   fullName: 'Liberty All-Star Growth',
  // }, {
  //   name: 'ATI',
  //   fullName: 'ATI Inc',
  // }, {
  //   name: 'ATO',
  //   fullName: 'Atmos Energy Corp',
  // }, {
  //   name: 'ATR',
  //   fullName: 'Aptargroup Inc',
  // }, {
  //   name: 'AU',
  //   fullName: 'AngloGold Ashanti Ltd',
  // }, {
  //   name: 'AUY',
  //   fullName: 'Yamana Gold Inc',
  // }, {
  //   name: 'AVA',
  //   fullName: 'Avista Corp',
  // }, {
  //   name: 'AVB',
  //   fullName: 'AvalonBay Communities',
  // }, {
  //   name: 'AVD',
  //   fullName: 'American Vanguard Corp',
  // }, {
  //   name: 'AVK',
  //   fullName: 'Advant Convertible & Income Fund',
  // }, {
  //   name: 'AVT',
  //   fullName: 'Avnet Inc',
  // }, {
  //   name: 'AWF',
  //   fullName: 'AllianceBernstein Global High Income Fund Inc.',
  // }, {
  //   name: 'AWI',
  //   fullName: 'Armstrong World Industries Inc',
  // }, {
  //   name: 'AWK',
  //   fullName: 'American Water Works Company',
  // }, {
  //   name: 'AWP',
  //   fullName: 'abrdn Global Premier Property',
  // }, {
  //   name: 'AWR',
  //   fullName: 'American States Water Co',
  // }, {
  //   name: 'AWX',
  //   fullName: 'Avalon Holdings Corp',
  // }, {
  //   name: 'AXL',
  //   fullName: 'American Axle & Manufacturing Holdings Inc',
  }, {
    name: 'AXP',
    fullName: 'American Express',
  // }, {
  //   name: 'AYI',
  //   fullName: 'Acuity Brands Inc',
  // }, {
  //   name: 'AZO',
  //   fullName: 'Autozone Inc',
  }, {
    name: 'B',
    fullName: 'Barnes Group Inc',
  }, {
    name: 'BA',
    fullName: 'Boeing',
  }, {
    name: 'BAC',
    fullName: 'Bank of America',
  }, {
    name: 'BAM',
    fullName: 'Brooksfield Asset Management Inc',
  }, {
    name: 'BBD',
    fullName: 'Banco Bradesco SA',
  }, {
    name: 'BBVA',
    fullName: 'Banco Bilbao Vizcaya Argenataria SA',
  }, {
    name: 'BBY',
    fullName: 'Best Buy Co Inc',
  // }, {
  //   name: 'BCE',
  //   fullName: 'BCE Inc',
  }, {
    name: 'BCH',
    fullName: 'Banco de Chile',
  }, {
    name: 'BCS',
    fullName: 'Barclays',
  // }, {
  //   name: 'BDC',
  //   fullName: 'Belden Inc',
  // }, {
  //   name: 'BDL',
  //   fullName: "Flanigan' Entreprise Inc",
  }, {
    name: 'BDN',
    fullName: 'Brandywine Realty Trust',
  // }, {
  //   name: 'BG',
  //   fullName: 'Bunge Ltd',
  // }, {
  //   name: 'BGI',
  //   fullName: 'Birks Group Inc',
  }, {
    name: 'BGS',
    fullName: 'B&G Foods Inc',
  }, {
    name: 'BH',
    fullName: 'Biglari Holdings Inc',
  }, {
    name: 'BHB',
    fullName: 'Bar Harbor Bankshares',
  }, {
    name: 'BHE',
    fullName: 'Benchmark Eletronics',
  }, {
    name: 'BIDU',
    fullName: 'Baidu',
  }, {
    name: 'BIIB',
    fullName: 'Biogen',
  }, {
    name: 'BIO',
    fullName: 'Bionovate Technologies Corp',
  // }, {
  //   name: 'BIOS',
  //   fullName: 'BioPlus Acquisition Corp',
  }, {
    name: 'BK',
    fullName: 'Bank of New York',
  }, {
    name: 'BKD',
    fullName: 'Brookdale Senior Living Inc',
  // }, {
  //   name: 'BKE',
  //   fullName: 'Buckle Inc',
  }, {
    name: 'BKH',
    fullName: 'Black Hills Corp',
  }, {
    name: 'BLK',
    fullName: 'BlackRock',
  }, {
    name: 'BLX',
    fullName: 'Foreign Trade Bank of Latin America Inc',
  // }, {
  //   name: 'BMA',
  //   fullName: 'Banco Macro SA',
  }, {
    name: 'BMO',
    fullName: 'Bank of Montreal',
  // }, {
  //   name: 'BR',
  //   fullName: 'Broadridge Finantial Solutions Inc',
  }, {
    name: 'BRN',
    fullName: 'Barnwell Industries Inc',
  // }, {
  //   name: 'BRO',
  //   fullName: 'Bro & Brown Inc',
  }, {
    name: 'BSX',
    fullName: 'Boston Scientific Group',
  }, {
    name: 'BTI',
    fullName: 'British American Tobacco',
  // }, {
  //   name: 'BTN',
  //   fullName: 'Ballantyne Strong Inc',
  }, {
    name: 'BTO',
    fullName: 'John Hancock Financial Opportunities Fund',
  }, {
    name: 'BTX',
    fullName: 'Brooklyn Immunotherapeutics Inc',
  // }, {
  //   name: 'BUR',
  //   fullName: 'Burford Capital LTD',
  }, {
    name: 'BVN',
    fullName: 'Compania de Minas Buenaventura SAA',
  // }, {
  //   name: 'BWA',
  //   fullName: 'Borgwarner Inc',
  // }, {
  //   name: 'BXP',
  //   fullName: 'Boston Properties',
  }, {
    name: 'C',
    fullName: 'Citigroup',
  // }, {
  //   name: 'CAG',
  //   fullName: 'Conagra Brands Inc',
  }, {
    name: 'CAH',
    fullName: 'Cardinal Health Inc',
  }, {
    name: 'CAJ',
    fullName: 'Canon',
  }, {
    name: 'CAKE',
    fullName: 'Cheesecake Factory Inc',
    // }, {
    //   name: 'CAL',
    //   fullName: 'Caleres Inc',

  }, {
    name: 'MSFT',
    fullName: 'Microsoft',
  }, {
    name: 'TSLA',
    fullName: 'Tesla',
  }, {
    name: 'V',
    fullName: 'Visa',
  }, {
    name: 'JNJ',
    fullName: 'Johnson & Johnson',
  }, {
    name: 'NVDA',
    fullName: 'NVIDIA',
  }, {
    name: 'XOM',
    fullName: 'Exxon Mobil',
  }, {
    name: 'WMT',
    fullName: 'Wallmart',
  }, {
    name: 'MA',
    fullName: 'Mastercard',
  }, {
    name: 'PFE',
    fullName: 'Pfizer',
  }, {
    name: 'KO',
    fullName: 'Coca-Cola',
  }, {
    name: 'PEP',
    fullName: 'Pepsico',
  // }, {
  //   name: 'VZ',
  //   fullName: 'Verizon',
  }, {
    name: 'AZN',
    fullName: 'Astrazeneca',
  // }, {
  //   name: 'TMO',
  //   fullName: 'Termo Fisher Scientific',
  }, {
    name: 'ORCL',
    fullName: 'Oracle',
  }, {
    name: 'MCD',
    fullName: 'McDonald',
  }, {
    name: 'CSCO',
    fullName: 'Cisco',
  }, {
    name: 'DIS',
    fullName: 'Walt Disney',
  // }, {
  //   name: 'CRM',
  //   fullName: 'Salesforce',
  }, {
    name: 'NKE',
    fullName: 'Nike',
  }, {
    name: 'QCOM',
    fullName: 'QUALCOMM',
  }, {
    name: 'INTC',
    fullName: 'Intel',
  // }, {
  //   name: 'UPS',
  //   fullName: 'United Parcel Service',
  }, {
    name: 'NEE',
    fullName: 'Nextera Energy',
  }, {
    name: 'TXN',
    fullName: 'Texas Instruments',
  // }, {
  //   name: 'MO',
  //   fullName: 'Morgan Stanley',
  // }, {
  //   name: 'PM',
  //   fullName: 'Philip Morris',
  }, {
    name: 'RY',
    fullName: 'Royal Bank Of Canada',
  // }, {
  //   name: 'SNY',
  //   fullName: 'Sanofi',
  }, {
    name: 'HSBC',
    fullName: 'HSBC',
  }, {
    name: 'UL',
    fullName: 'Unilever',
  }, {
    name: 'HON',
    fullName: 'Honeywell',
  // }, {
  //   name: 'SCHW',
  //   fullName: 'Charles Schwab',
  // }, {
  //   name: 'MDT',
  //   fullName: 'Medtronic',
  }, {
    name: 'IBM',
    fullName: 'IBM',
  }, {
    name: 'TD',
    fullName: 'Toronto Dominion Bank',
  // }, {
  //   name: 'COP',
  //   fullName: 'ConocoPhilips',
  }, {
    name: 'GS',
    fullName: 'Goldman Sachs',
  }, {
    name: 'HDB',
    fullName: 'HDFC Bank',
  // }, {
  //   name: 'LMT',
  //   fullName: 'Lockheed Martin',
  // }, {
  //   name: 'DEO',
  //   fullName: 'Diageo',
  // }, {
  //   name: 'JD',
  //   fullName: 'Jingdong Mall',
  // }, {
  //   name: 'DE',
  //   fullName: 'Deere & Company',
  }, {
    name: 'SBUX',
    fullName: 'Starbucks',
  // }, {
  //   name: 'RIO',
  //   fullName: 'Rio Tinto',
  // }, {
  //   name: 'PLD',
  //   fullName: 'Prologis',
  // }, {
  //   name: 'EL',
  //   fullName: 'Estee Lauder',
  }, {
    name: 'NFLX',
    fullName: 'Netflix',
  // }, {
  //   name: 'ENB',
  //   fullName: 'Enbridge',
  // }, {
  //   name: 'CI',
  //   fullName: 'Cigna',
  // }, {
  //   name: 'MDLZ',
  //   fullName: 'Mondelez',
  // }, {
  //   name: 'ZTS',
  //   fullName: 'Zoetis',
  // }, {
  //   name: 'DUK',
  //   fullName: 'Duke Energy',
  // }, {
  //   name: 'CHTR',
  //   fullName: 'Charter Communications',
  // }, {
  //   name: 'CNI',
  //   fullName: 'Canadian National Railway',
  // }, {
  //   name: 'INFY',
  //   fullName: 'Infosys',
  // }, {
  //   name: 'GILD',
  //   fullName: 'Gilead Sciences',
  // }, {
  //   name: 'MO',
  //   fullName: 'Altria Group',
  }, {
    name: 'ISRG',
    fullName: 'Intuitive Surgical',
  // }, {
  //   name: 'MMC',
  //   fullName: 'Marsh & McLennan Companies',
  }, {
    name: 'SO',
    fullName: 'Southern Company',
  }, {
    name: 'PBR',
    fullName: 'Petrobras',
  }, {
    name: 'MMM',
    fullName: '3M',
  // }, {
  //   name: 'SYK',
  //   fullName: 'Stryker Corporation',
  // }, {
  //   name: 'CME',
  //   fullName: 'CME Group',
  }, {
    name: 'VRTX',
    fullName: 'Vertex Pharmaceutical',
  // }, {
  //   name: 'TJX',
  //   fullName: 'TJX Companies',
  // }, {
  //   name: 'GE',
  //   fullName: 'General Electric',
  }, {
    name: 'FMX',
    fullName: 'Fomento Económico Mexicano',
  // }, {
  //   name: 'SNP',
  //   fullName: 'Sinopec',
  }, {
    name: 'TGT',
    fullName: 'Target',
  // }, {
  //   name: 'NOC',
  //   fullName: 'Northrop Grumman',
  }, {
    name: 'MU',
    fullName: 'Micron Technology',
  }, {
    name: 'CP',
    fullName: 'Canadian Pacific Railway',
  // }, {
  //   name: 'IBN',
  //   fullName: 'ICIC Bank',
  // }, {
  //   name: 'PNC',
  //   fullName: 'PNC Financial Services',
  // }, {
  //   name: 'PGR',
  //   fullName: 'Progressive',
  // }, {
  //   name: 'CSX',
  //   fullName: 'CSX Corporation',
  // }, {
  //   name: 'SHW',
  //   fullName: 'Sherwin-Williams',
  }, {
    name: 'EW',
    fullName: 'Edward Lifesciences',
  }, {
    name: 'WM',
    fullName: 'Waste Management',
  }, {
    name: 'D',
    fullName: 'Dominion Energy',
  // }, {
  //   name: 'FISV',
  //   fullName: 'Fiserv',
  // }, {
  //   name: 'HUM',
  //   fullName: 'Humana',
  }, {
    name: 'ATVI',
    fullName: 'Activision Blizzard',
  // }, {
  //   name: 'EOG',
  //   fullName: 'EOG Resources',
  }, {
    name: 'VALE',
    fullName: 'Vale',
  // }, {
  //   name: 'GD',
  //   fullName: 'General Dynamics',
  }, {
    name: 'NTES',
    fullName: 'NetEase',
  }, {
    name: 'FIS',
    fullName: 'Fidelity National Information Services',
  }, {
    name: 'OXY',
    fullName: 'Occidental Petroleum',
  }, {
    name: 'FDX',
    fullName: 'Fedex',
  // }, {
  //   name: 'EQIX',
  //   fullName: 'Equinix',
  // }, {
  //   name: 'UBS',
  //   fullName: 'UBS',
  }, {
    name: 'CNQ',
    fullName: 'Canadian Natural Resources',
  // }, {
  //   name: 'NSC',
  //   fullName: 'Norfolk Southern',
  // }, {
  //   name: 'DG',
  //   fullName: 'Dollar General',
  // }, {
  //   name: 'PSA',
  //   fullName: 'Public Storage',
  // }, {
  //   name: 'EPD',
  //   fullName: 'Enterprise Product',
  // }, {
  //   name: 'ICE',
  //   fullName: 'Intercontinental Exchange',
  // }, {
  //   name: 'CNC',
  //   fullName: 'Centene',
  // }, {
  //   name: 'RELX',
  //   fullName: 'RELX',
  // }, {
  //   name: 'MCO',
  //   fullName: "Moody's",
  // }, {
  //   name: 'HCA',
  //   fullName: 'HCA Healthcare',
  // }, {
  //   name: 'ETN',
  //   fullName: 'Eaton',
  // }, {
  //   name: 'TRP',
  //   fullName: 'TC Energy',
  // }, {
  //   name: 'TRI',
  //   fullName: 'Thomson Reuters',
  }, {
    name: 'PXD',
    fullName: 'Pioneer National Resources',
  }, {
    name: 'GM',
    fullName: 'General Motors',
  }, {
    name: 'F',
    fullName: 'Ford',
  }, {
    name: 'SNPS',
    fullName: 'Synopsys',
  // }, {
  //   name: 'MET',
  //   fullName: 'MetLife',
  // }, {
  //   name: 'MAR',
  //   fullName: 'Marriott International',
  // }, {
  //   name: 'KLAC',
  //   fullName: 'KLA',
  // }, {
  //   name: 'EMR',
  //   fullName: 'Emerson',
  }, {
    name: 'NGG',
    fullName: 'National Grid',
  }, {
    name: 'VMW',
    fullName: 'Vmware',
  // }, {
  //   name: 'MCK',
  //   fullName: 'McKesson',
  }, {
    name: 'SRE',
    fullName: 'Sempra Energy',
  }, {
    name: 'MPC',
    fullName: 'Marathon Petroleum',
  // }, {
  //   name: 'FTNT',
  //   fullName: 'Fortinet',
  // }, {
  //   name: 'STZ',
  //   fullName: 'Constellation Brands',
  // }, {
  //   name: 'ORLY',
  //   fullName: "O'Reilly Automotive",
  }, {
    name: 'CDNS',
    fullName: 'Cadence Design Systems',
  }, {
    name: 'ECL',
    fullName: 'Ecolab',
  }, {
    name: 'NXPI',
    fullName: 'NXP Semiconductors',
  }, {
    name: 'KMB',
    fullName: 'Kimberly-Clark',
  // }, {
  //   name: 'SYY',
  //   fullName: 'Sysco',
  }, {
    name: 'HSY',
    fullName: 'The Hershey Company',
  }, {
    name: 'COF',
    fullName: 'Capital One',
  // }, {
  //   name: 'GIS',
  //   fullName: 'General Mills',
  }, {
    name: 'VLO',
    fullName: 'Valero Energy',
  // }, {
  //   name: 'MRVL',
  //   fullName: 'Marvell Technology Group',
  }, {
    name: 'VOD',
    fullName: 'Vodafone',
  }, {
    name: 'SU',
    fullName: 'Suncor Energy',
  }, {
    name: 'SAN',
    fullName: 'Santander',
  }, {
    name: 'HMC',
    fullName: 'Honda',
  // }, {
  //   name: 'CM',
  //   fullName: 'CIBC',
  }, {
    name: 'NEM',
    fullName: 'Newmont',
  // }, {
  //   name: 'KKR',
  //   fullName: 'KKR & Co.',
  // }, {
  //   name: 'PAYX',
  //   fullName: 'Paychecx',
  }, {
    name: 'EXC',
    fullName: 'Exelon Corporation',
  // }, {
  //   name: 'ROP',
  //   fullName: 'Roper Tecnologies',
  }, {
    name: 'ITUB',
    fullName: 'Itaú Unibanco',
  }, {
    name: 'O',
    fullName: 'Realty Income',
  // }, {
  //   name: 'FCX',
  //   fullName: 'Freeport-McMoRan',
  // }, {
  //   name: 'SMFG',
  //   fullName: 'Sumitomo Mitsui Financial Group',
  // }, {
  //   name: 'PSX',
  //   fullName: 'Phillips 66',
  // }, {
  //   name: 'E',
  //   fullName: 'ENI',
  }, {
    name: 'RSG',
    fullName: 'Republic Services',
  // }, {
  //   name: 'CTAS',
  //   fullName: 'Cintas',
  }, {
    name: 'TEL',
    fullName: 'TE Connectivity',
  // }, {
  //   name: 'WMB',
  //   fullName: 'Williams Companies',
  // }, {
  //   name: 'KMI',
  //   fullName: 'Kinder Morgan',
  // }, {
  //   name: 'SPG',
  //   fullName: 'Simon Property Group',
  }, {
    name: 'DLTR',
    fullName: 'Dollar Tree',
  }, {
    name: 'SCCO',
    fullName: 'Southern Copper',
  }, {
    name: 'DVN',
    fullName: 'Devon Energy',
  }, {
    name: 'CMG',
    fullName: 'Chipotle Mexican Grill',
  // }, {
  //   name: 'XEL',
  //   fullName: 'Xcel Energy',
  // }, {
  //   name: 'LYG',
  //   fullName: 'Lloyd Banking Group',
  }, {
    name: 'MSI',
    fullName: 'Motorola Solutions',
  }, {
    name: 'MELI',
    fullName: 'Mercado Livre',
  // }, {
  //   name: 'WDAY',
  //   fullName: 'Workday',
  }, {
    name: 'DLR',
    fullName: 'Digital Realty',
  }, {
    name: 'MCHP',
    fullName: 'Microchip Technology',
  // }, {
  //   name: 'PRU',
  //   fullName: 'Prudential Financial',
  // }, {
  //   name: 'ING',
  //   fullName: 'ING',
  }, {
    name: 'EA',
    fullName: 'Electronic Arts',
  }, {
    name: 'CTSH',
    fullName: 'Cognizant Technology Solutions',
  }, {
    name: 'CVE',
    fullName: 'Cenovus Energy',
  }, {
    name: 'SBAC',
    fullName: 'SBA Communications',
  // }, {
  //   name: 'MSCI',
  //   fullName: 'MSCI',
  // }, {
  //   name: 'PUK',
  //   fullName: 'Prudential',
  }, {
    name: 'YUM',
    fullName: 'Yum! Brands',
  }, {
    name: 'HPQ',
    fullName: 'Hewlett Packard',
  }, {
    name: 'JCI',
    fullName: 'Johson Controls',
  // }, {
  //   name: 'KR',
  //   fullName: 'Kroger',
  }, {
    name: 'MFC',
    fullName: 'Manulife Financial',
  }, {
    name: 'LNG',
    fullName: 'Cheniere Energy',
  }, {
    name: 'RMD',
    fullName: 'ResMed',
  // }, {
  //   name: 'PH',
  //   fullName: 'Parker-Hannifin',
  }, {
    name: 'WBA',
    fullName: 'Walgreens Boots Alliance',
  }, {
    name: 'GPN',
    fullName: 'Global Payments',
  },

];

async function getCompanies() {
  const results = await Company.findAll({ attributes: ['id', 'name', 'fullName'] });
  return results;
}

// async function get(day) {
//   return COMPANY_LIST.map((company, index) => ({
//     name: company.name,
//     fullName: company.fullName,
//     open: stocksModel.OPEN * (0.9 + ((index % 20) / 100)) * day,
//     high: stocksModel.HIGH * (0.9 + ((index % 20) / 100)) * day,
//     low: stocksModel.LOW * (1 - index / 400) * (0.9 + ((index % 20) / 100)) * day,
//     close: stocksModel.CLOSE * (0.9 + ((index % 20) / 100)) * day,
//   }));
// }

async function getTrends(days) {
  const day = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const companies = await getCompanies();
  const current = await timeStocksModel.getAllStocksFromDay(companies);
  const past = await timeStocksModel.getAllStocksFromDay(companies, day);
  const trends = [];
  for (let i = 0; i < current.length; i += 1) {
    const [currentAvg, pastAvg] = [sum(current[i].high, current[i].low) / 2,
      sum(past[i].high, past[i].low) / 2];
    trends.push({
      name: current[i].companyName,
      fullName: current[i].fullName,
      absoluteVariation: Number(sub(currentAvg, pastAvg)),
      relativeVariation: Number((currentAvg / pastAvg).toFixed(2)),
    });
  }
  return trends;
}

async function getTrendingCompaniesFactory() {
  const memo = {};
  return async function getTrendingCompanies(days, amount) {
    let messageMemo; let worstAbsolute; let bestAbsolute; let worstRelative; let
      bestRelative;
    const today = new Date(Date.now());
    const wantedDay = new Date(today.valueOf() - days * 24 * 60 * 60 * 1000);
    wantedDay.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const key = String(today.valueOf() / 100000) + String(wantedDay.valueOf() / 100000);

    if (!(key in memo)
    || (memo[key].bestRelative.length < amount)) {
      const trends = await getTrends(days);
      trends.sort((a, b) => a.absoluteVariation - b.absoluteVariation);
      [worstAbsolute, bestAbsolute] = [trends.slice(0, amount), trends.slice(amount * (-1))];
      trends.sort((a, b) => a.relativeVariation - b.relativeVariation);
      [worstRelative, bestRelative] = [trends.slice(0, amount), trends.slice(amount * (-1))];
      memo[key] = {
        bestRelative, worstRelative, bestAbsolute, worstAbsolute,
      };
      messageMemo = 'Calculated';
    } else messageMemo = 'Memoized';
    return {
      trends: {
        bestAbsolute: memo[key].bestAbsolute.slice(0, amount),
        worstAbsolute: memo[key].worstAbsolute.slice(0, amount),
        bestRelative: memo[key].bestRelative.slice(0, amount),
        worstRelative: memo[key].worstRelative.slice(0, amount),
      },
      messageMemo,
    };
  };
}
async function getCompanyByAttribute(key, value) {
  if (Object.keys(Company.rawAttributes).find((k) => k === key)) {
    const result = await Company.findAll({
      attributes: ['id', 'name', 'fullName'],
      where: {
        [key]: [value],
      },
    });
    if (result.length === 0) throw new Error('Not Found.');
    return result[0];
  }
  throw new Error('Invalid key.');
}

async function getStockPriceFactory(referenceDay = Date.now()) {
  let day = new Date(referenceDay);
  day.setHours(0, 0, 0, 0);
  const memo = {
    [day.valueOf()]: [],
  };
  async function getStockPrice({ key, value }, stockDay = Date.now()) {
    day = new Date(stockDay);
    day.setHours(0, 0, 0, 0);
    if (!(day.valueOf() in memo)) {
      memo[day.valueOf()] = [];
    }

    const company = await getCompanyByAttribute(key, value);
    if (company.error) return company;

    let companyMemo = memo[day.valueOf()].find((c) => c.fullName === company.fullName);
    let messageMemo;

    if (!companyMemo) {
      const {
        close, companyName, date, fullName, high, low, open, lowHour, highHour,
      } = await timeStocksModel.getStockFromDay(company, day);
      companyMemo = {
        close, companyName, date, fullName, high, low, open, lowHour, highHour,
      };
      if (companyMemo.lowHour === undefined) {
        companyMemo.lowHour = Math.floor(Math.random() * 7) + 11;
      }

      if (companyMemo.highHour === undefined) {
        companyMemo.highHour = Math.floor(Math.random() * 7) + 11;
      }

      memo[day.valueOf()].push(companyMemo);
      messageMemo = 'Calculated';
    } else messageMemo = 'Memoized';

    const now = new Date(stockDay);

    if (now.getHours() <= 10) {
      return {
        companyMemo,
        messageMemo,
        memo,
        stockPrice: companyMemo.open,
      };
    }
    if (now.getHours() >= 18) {
      return {
        companyMemo,
        messageMemo,
        memo,
        stockPrice: companyMemo.close,
      };
    }
    if (now.getHours() === companyMemo.lowHour) {
      return {
        companyMemo,
        messageMemo,
        memo,
        stockPrice: companyMemo.low,
      };
    }
    if (now.getHours() === companyMemo.highHour) {
      return {
        companyMemo,
        messageMemo,
        memo,
        stockPrice: companyMemo.high,
      };
    }
    const u = (Number(sum(companyMemo.high, companyMemo.low))) / 2;
    const o = (Number(sub(companyMemo.high, u))) / 3;
    const distribution = random.normal(u, o);
    const randomPrice = distribution();
    if (randomPrice < companyMemo.low) {
      return {
        messageMemo,
        memo,
        companyMemo,
        stockPrice: companyMemo.low,
      };
    }
    if (randomPrice > companyMemo.high) {
      return {
        messageMemo,
        memo,
        companyMemo,
        stockPrice: companyMemo.high,
      };
    }
    return {
      messageMemo,
      memo,
      companyMemo,
      stockPrice: randomPrice.toFixed(3),
    };
  }

  return getStockPrice;
}

module.exports = {
  COMPANY_LIST,
  getCompanies,
  getCompanyByAttribute,
  getStockPriceFactory,
  getTrendingCompaniesFactory,
};
