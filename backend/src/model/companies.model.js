const random = require('random');
const { Company } = require('../../models/index');
const { sum, sub } = require('../utils/arithmetic');
const timeStocksModel = require('./timeStocks.model');

require('dotenv').config();

const COMPANY_LIST = [
  {
    name: 'A',
    fullName: 'Agilent Technologies Inc',
  },
  {
    name: 'AA',
    fullName: 'Alcoa Corp',
  },
  {
    name: 'AAC',
    fullName: 'Ares Acquisition Corp',
  }, {
    name: 'AAL',
    fullName: 'American Airlines',
  }, {
    name: 'AAN',
    fullName: "Aaron's Company Inc",
  }, {
    name: 'AAOI',
    fullName: 'Applied Optoeletronics Inc',
  }, {
    name: 'AAON',
    fullName: 'Aaon Inc',
  }, {
    name: 'AAPL',
    fullName: 'Apple',
  }, {
    name: 'AAT',
    fullName: 'American Assets Trust Inc',
  }, {
    name: 'AAU',
    fullName: 'Almaden Minerals LTD',
  }, {
    name: 'AB',
    fullName: 'AllianceBernstein Holding LP',
  }, {
    name: 'ABB',
    fullName: 'ABB LTD',
  }, {
    name: 'ABBV',
    fullName: 'AbbVie',
  }, {
    name: 'ABCB',
    fullName: 'Ameris Bancorop',
  }, {
    name: 'ABC',
    fullName: 'Amerisourcebergen Corp',
  }, {
    name: 'ABEO',
    fullName: 'Abeona Therapeutics Inc',
  }, {
    name: 'ABEV',
    fullName: 'Ambev',
  }, {
    name: 'ABG',
    fullName: 'Asbury Automative Group Inc',
  }, {
    name: 'ABIO',
    fullName: 'Arca Biofarma Inc',
  }, {
    name: 'ABM',
    fullName: 'ABM Industries Inc',
  }, {
    name: 'ABMD',
    fullName: 'ABIOMED Inc',
  }, {
    name: 'ABR',
    fullName: 'Arbor Realty Trust Inc',
  }, {
    name: 'ABT',
    fullName: 'Abbott Laboratories',
  }, {
    name: 'ABUS',
    fullName: 'Arbutus Biopharma Corp',
  }, {
    name: 'ACAD',
    fullName: 'ACADIA Pharmaceuticals Inc',
  }, {
    name: 'ACC',
    fullName: 'American Campus Communities Inc',
  }, {
    name: 'ACCO',
    fullName: 'ACCO Brands Corp',
  }, {
    name: 'ACER',
    fullName: 'Acer Therapeutics Inc',
  }, {
    name: 'ACGL',
    fullName: 'Arch Capital Group LTD',
  }, {
    name: 'ACH',
    fullName: 'Aluminium Corporation of China Ltd',
  }, {
    name: 'ACHC',
    fullName: 'Acadia Healthcare Company Inc',
  }, {
    name: 'ACHV',
    fullName: 'Achieve Life Sciences Inc',
  }, {
    name: 'ACIW',
    fullName: 'ACI Worldwide Inc',
  }, {
    name: 'ACLS',
    fullName: 'Axcelis Technologies Inc',
  }, {
    name: 'ACM',
    fullName: 'AECOM',
  }, {
    name: 'ACN',
    fullName: 'Accenture',
  }, {
    name: 'ACNB',
    fullName: 'ACNB Corp',
  }, {
    name: 'ACOR',
    fullName: 'Acorda Therapeutics Inc',
  }, {
    name: 'ACP',
    fullName: 'abrdn Income Credit Strategies Fund',
  }, {
    name: 'ACRE',
    fullName: 'Ares Commercial Real State Corp',
  }, {
    name: 'ACRX',
    fullName: 'AcelRx Pharmaceuticals Inc',
  }, {
    name: 'ACST',
    fullName: 'Acasti Pharma Inc',
  }, {
    name: 'ACTG',
    fullName: 'Acacia Research Group',
  }, {
    name: 'ACU',
    fullName: 'Acme United Corp',
  }, {
    name: 'ACXM',
    fullName: 'Alcoa Corp',
  }, {
    name: 'ADBE',
    fullName: 'Adobe',
  }, {
    name: 'ADC',
    fullName: 'Agree Realty Corp',
  }, {
    name: 'ADI',
    fullName: 'Analog Devices Inc',
  }, {
    name: 'ADM',
    fullName: 'Archland-Daniels-Midland Co',
  }, {
    name: 'ADMA',
    fullName: 'ADMA Biologics Inc',
  }, {
    name: 'ADMP',
    fullName: 'Adami Pharmaceuticals ',
  }, {
    name: 'ADP',
    fullName: 'Automatic Data Processing Inc',
  }, {
    name: 'ADTN',
    fullName: 'ADTRAN Holdings Inc',
  }, {
    name: 'ADUS',
    fullName: 'Addus Homecare Corp',
  }, {
    name: 'ADX',
    fullName: 'Adams Diversified Equity Fund',
  }, {
    name: 'ADXS',
    fullName: 'Advaxis Inc',
  }, {
    name: 'AE',
    fullName: 'Adams Resource and Energy Inc',
  }, {
    name: 'AEE',
    fullName: 'Ameren Corp',
  }, {
    name: 'AEG',
    fullName: 'Aegon NV',
  }, {
    name: 'AEHR',
    fullName: 'Aehr Test Systems',
  }, {
    name: 'AEL',
    fullName: 'American Equity Investment Life Holding Co',
  }, {
    name: 'AEM',
    fullName: 'Agnico Eagle Mines LTD',
  }, {
    name: 'AEO',
    fullName: 'American Eagle Outfitters Inc',
  }, {
    name: 'AEP',
    fullName: 'American Electric Power Inc',
  }, {
    name: 'AER',
    fullName: 'AerCap Holdings NV',
  }, {
    name: 'AERI',
    fullName: 'Aerie Pharmaceuticals Inc',
  }, {
    name: 'AES',
    fullName: 'AES Corp',
  }, {
    name: 'AEY',
    fullName: 'ADDvantage Technologies Group Inc',
  }, {
    name: 'AEZS',
    fullName: 'Aeterna Zentaris Inc',
  }, {
    name: 'AFB',
    fullName: 'AllianceBernstein National Municipal Income Fund',
  }, {
    name: 'AFG',
    fullName: 'American Financial Group Inc',
  }, {
    name: 'AFGE',
    fullName: 'American Financial Group Inc',
  }, {
    name: 'AFL',
    fullName: 'Aflac Inc',
  }, {
    name: 'AFMD',
    fullName: 'Affimed NV',
  }, {
    name: 'AFT',
    fullName: 'Apollo Senior Floating Rate Fund',
  }, {
    name: 'AG',
    fullName: 'First Majestic Silver Corp',
  }, {
    name: 'AGCO',
    fullName: 'AGCO Corpo',
  }, {
    name: 'AGD',
    fullName: 'abrdn Global Dynamic Dividend Fund',
  }, {
    name: 'AGEN',
    fullName: 'Agenus Inc',
  }, {
    name: 'AGFS',
    fullName: 'AgroFresh Solutions Inc',
  }, {
    name: 'AGI',
    fullName: 'Alamos Gold Inc',
  }, {
    name: 'AGIO',
    fullName: 'Agios Pharmaceutical Inc',
  }, {
    name: 'AGM',
    fullName: 'Federal Agricultural Mortgage Corp',
  }, {
    name: 'AGNC',
    fullName: 'AGNC Investment Corp',
  }, {
    name: 'AGO',
    fullName: 'Assured Guranty Ltd',
  }, {
    name: 'AGRO',
    fullName: 'Adecoagro SA',
  }, {
    name: 'AGX',
    fullName: 'Agile Therapeutics Inc',
  }, {
    name: 'AGYS',
    fullName: 'Agylysis Inc',
  }, {
    name: 'AHPI',
    fullName: 'Allied Healthcare Products Inc',
  }, {
    name: 'AHT',
    fullName: 'Ashford Hospitality Trust Inc',
  }, {
    name: 'AI',
    fullName: 'C3.ai Inc',
  }, {
    name: 'AIF',
    fullName: 'Apollo Tactical Income Fund',
  }, {
    name: 'AIG',
    fullName: 'AIG',
  }, {
    name: 'AIMC',
    fullName: 'Altra Industrial Motion Corp',
  }, {
    name: 'AIN',
    fullName: 'Albany International Corp',
  }, {
    name: 'AINC',
    fullName: 'Ashford Inc',
  }, {
    name: 'AINV',
    fullName: 'Apollo Investment Corp',
  }, {
    name: 'AIR',
    fullName: 'AAR Corp',
  }, {
    name: 'AIRI',
    fullName: 'Air Industries Group',
  }, {
    name: 'AIRT',
    fullName: 'Air T Inc',
  }, {
    name: 'AIT',
    fullName: 'Applied Industries Technologies Inc',
  }, {
    name: 'AIV',
    fullName: 'Apartment Investment and Management Co',
  }, {
    name: 'AIZ',
    fullName: 'Assurant Inc',
  }, {
    name: 'AJG',
    fullName: 'Arthur J. Gallagher & Co.',
  }, {
    name: 'AJRD',
    fullName: 'Aerojet Rocketdyne Holdings Inc',
  }, {
    name: 'AJX',
    fullName: 'Great Ajax Corp',
  }, {
    name: 'AKAM',
    fullName: 'Akamai Technologies Inc',
  }, {
    name: 'AKBA',
    fullName: 'Akebia Therapeutics Inc',
  }, {
    name: 'AKO-A',
    fullName: 'Embotelladora Andina SA',
  }, {
    name: 'AKO-B',
    fullName: 'Embotelladora Andina SA',
  }, {
    name: 'AKR',
    fullName: 'Akadia Realty Test',
  }, {
    name: 'AKTX',
    fullName: 'Akari Therapeutics PLC',
  }, {
    name: 'AL',
    fullName: 'Air Lease Corp',
  }, {
    name: 'ALB',
    fullName: 'Albermarle Corp',
  }, {
    name: 'ALE',
    fullName: 'ALLETE Inc',
  }, {
    name: 'ALG',
    fullName: 'Alamo Group Inc',
  }, {
    name: 'ALK',
    fullName: 'Alaska Air Group Inc',
  }, {
    name: 'ALL',
    fullName: 'Allstate',
  }, {
    name: 'ALT',
    fullName: 'Altimmune Inc',
  }, {
    name: 'ALV',
    fullName: 'Autoliv Inc',
  }, {
    name: 'ALX',
    fullName: 'Alexander\'s Inc',
  }, {
    name: 'AM',
    fullName: 'Antero Midstream Corp',
  }, {
    name: 'AMC',
    fullName: 'AMC Entertainment Holdings Inc',
  }, {
    name: 'AMD',
    fullName: 'Advanced Micro Devices Inc',
  }, {
    name: 'AME',
    fullName: 'AMETEK Inc',
  }, {
    name: 'AMG',
    fullName: 'Affiliated Managers Group Inc',
  }, {
    name: 'AMH',
    fullName: 'American Homes 4 Rent',
  }, {
    name: 'AMN',
    fullName: 'AMN Healthcare Services',
  }, {
    name: 'AMP',
    fullName: 'Ameriprise Financial Inc',
  }, {
    name: 'AMS',
    fullName: 'American Shared Hospital Services',
  }, {
    name: 'AMT',
    fullName: 'American Tower',
  }, {
    name: 'AMX',
    fullName: 'American Movil SAB de CV',
  }, {
    name: 'AMZN',
    fullName: 'Amazon',
  }, {
    name: 'AN',
    fullName: 'AutoNation Inc',
  }, {
    name: 'ANF',
    fullName: 'Abercrombie & Fitch Co',
  }, {
    name: 'ANY',
    fullName: 'Sphere 3D Corp',
  }, {
    name: 'AOD',
    fullName: 'abrdn Total Dynamic Dividend Fund',
  }, {
    name: 'AON',
    fullName: 'Aon PLC',
  }, {
    name: 'AOS',
    fullName: 'A O  Smith Corp',
  }, {
    name: 'AP',
    fullName: 'Ampco-Pittsburgh Corp',
  }, {
    name: 'APA',
    fullName: 'APA Corp (US)',
  }, {
    name: 'APD',
    fullName: 'Air Products and Chemicals Inc',
  }, {
    name: 'APH',
    fullName: 'Amphenol Corp',
  }, {
    name: 'APO',
    fullName: 'Apollo Global Management Inc',
  }, {
    name: 'APT',
    fullName: 'Alpha Pro Tech LTD',
  }, {
    name: 'AR',
    fullName: 'Antero Resources Corp',
  }, {
    name: 'ARC',
    fullName: 'ARC Document Solutions Inc',
  }, {
    name: 'ARE',
    fullName: 'Alexandria Real Estate Equities Inc',
  }, {
    name: 'ARI',
    fullName: 'Apollo Commercial Real Estate Finance Inc',
  }, {
    name: 'ARL',
    fullName: 'American Realty Investors Inc',
  }, {
    name: 'ARR',
    fullName: 'ARMOUR Residential REIT Inc',
  }, {
    name: 'ASA',
    fullName: 'ASA Gold and Precious Metals Limited',
  }, {
    name: 'ASB',
    fullName: 'Associated Banc-Corp',
  }, {
    name: 'ASG',
    fullName: 'Liberty All-Star Growth',
  }, {
    name: 'ATI',
    fullName: 'ATI Inc',
  }, {
    name: 'ATO',
    fullName: 'Atmos Energy Corp',
  }, {
    name: 'ATR',
    fullName: 'Aptargroup Inc',
  }, {
    name: 'AU',
    fullName: 'AngloGold Ashanti Ltd',
  }, {
    name: 'AUY',
    fullName: 'Yamana Gold Inc',
  }, {
    name: 'AVA',
    fullName: 'Avista Corp',
  }, {
    name: 'AVB',
    fullName: 'AvalonBay Communities',
  }, {
    name: 'AVD',
    fullName: 'American Vanguard Corp',
  }, {
    name: 'AVK',
    fullName: 'Advant Convertible & Income Fund',
  }, {
    name: 'AVT',
    fullName: 'Avnet Inc',
  }, {
    name: 'AWF',
    fullName: 'AllianceBernstein Global High Income Fund Inc.',
  }, {
    name: 'AWI',
    fullName: 'Armstrong World Industries Inc',
  }, {
    name: 'AWK',
    fullName: 'American Water Works Company',
  }, {
    name: 'AWP',
    fullName: 'abrdn Global Premier Property',
  }, {
    name: 'AWR',
    fullName: 'American States Water Co',
  }, {
    name: 'AWX',
    fullName: 'Avalon Holdings Corp',
  }, {
    name: 'AXL',
    fullName: 'American Axle & Manufacturing Holdings Inc',
  }, {
    name: 'AXP',
    fullName: 'American Express',
  }, {
    name: 'AYI',
    fullName: 'Acuity Brands Inc',
  }, {
    name: 'AZO',
    fullName: 'Autozone Inc',
  }, {
    name: 'AZZ',
    fullName: 'AZZ Inc',
  }];

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
    const o = (Number(sub(companyMemo.high, u))) / 2;
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
