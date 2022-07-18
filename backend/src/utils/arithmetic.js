/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
function sum(a, b) {
  if (a.toString() === '0') return b.toString();
  if (b.toString() === '0') return a.toString();

  if (a.toString()[0] === '-' && b.toString()[0] !== '-') return sub(b, a.toString().substring(1));
  if (a.toString()[0] !== '-' && b.toString()[0] === '-') return sub(a, b.toString().substring(1));
  if (a.toString()[0] === '-' && b.toString()[0] === '-') return `-${(sum(a.toString().substring(1), b.toString().substring(1)))}`;

  const s1 = a.toString().split(/,|\./);
  const s2 = b.toString().split(/,|\./);
  if (s1.length === 1 && s2.length === 1) return (Number(a) + Number(b)).toString();
  if (s1.length === 1 && s2.length === 2) {
    const d1 = Number(s1[0]) + Number(s2[0]);
    return (`${d1}.${s2[1]}`).toString();
  }
  if (s1.length === 2 && s2.length === 1) {
    const d1 = Number(s1[0]) + Number(s2[0]);
    return (`${d1}.${s1[1]}`).toString();
  }
  let d1 = Number(s1[0]) + Number(s2[0]);
  while (s1[1].length < s2[1].length) s1[1] += '0';
  while (s2[1].length < s1[1].length) s2[1] += '0';
  let d2 = '';
  let offset = 0;
  for (let i = s1[1].length - 1; i >= 0; i--) {
    const n1 = Number(s1[1][i]);
    const n2 = Number(s2[1][i]);
    let resul = n1 + n2 + offset;

    if (resul >= 10) {
      offset = 1;
      resul %= 10;
    } else {
      offset = 0;
    }
    d2 = resul + d2;
  }
  d1 += offset;
  return (`${d1}.${d2}`).toString();
}

function sub(a, b) {
  if (a.toString() === b.toString()) return '0';
  if (a.toString() === '0') return `-${b.toString()}`;
  if (b.toString() === '0') return a.toString();
  if (b.toString()[0] === '-') return sum(a, b.toString().substring(1));
  if (a.toString()[0] === '-') return `-${sum(a.toString().substring(1), b)}`;

  const s1 = a.toString().split(/,|\./);
  const s2 = b.toString().split(/,|\./);
  let maior = 0;
  if (Number(s1[0]) > Number(s2[0])) maior = 1;
  if (Number(s2[0]) > Number(s1[0])) return `-${sub(s2, s1)}`;

  if (s1.length === 1 && s2.length === 1) return (a - b).toString();
  if (s1.length === 1) s1.push('0');
  if (s2.length === 1) s2.push('0');

  let d1 = Number(s1[0]) - Number(s2[0]);
  while (s1[1].length < s2[1].length) s1[1] += '0';
  while (s2[1].length < s1[1].length) s2[1] += '0';
  let d2 = '';
  let offset = 0;
  let resul;
  let cont = 0;
  while (maior === 0) {
    if (Number(s1[1][cont]) > Number(s2[1][cont])) maior = 1;
    if (Number(s2[1][cont]) > Number(s1[1][cont])) return `-${sub(s2, s1)}`;
    cont++;
  }

  for (let i = s1[1].length - 1; i >= 0; i--) {
    const n1 = Number(s1[1][i]);
    const n2 = Number(s2[1][i]);
    resul = n1 - n2 - offset;
    if (resul < 0) {
      offset = 1;
      resul = 10 + resul;
    } else {
      offset = 0;
    }
    d2 = resul + d2;
  }
  d1 -= offset;
  return (`${d1}.${d2}`).toString();
}

function mul(a, b) {
  if (a.toString() === '0' || b.toString() === '0') return '0';
  if (a.toString()[0] === '-' && b.toString()[0] !== '-') return `-${mul(a.toString().substring(1), b)}`;
  if (a.toString()[0] !== '-' && b.toString()[0] === '-') return `-${mul(a, b.toString().substring(1))}`;
  if (a.toString()[0] === '-' && b.toString()[0] === '-') return mul(a.toString().substring(1), b.toString().substring(1));

  const s1 = a.toString().split(/,|\./);
  const s2 = b.toString().split(/,|\./);
  let offset = 0;
  let result;
  if (s1.length === 2) offset += s1[1].length;
  if (s2.length === 2) offset += s2[1].length;
  const [aux1, aux2] = [s1.join(''), s2.join('')];

  if (aux1.length + aux2.length > 16) result = (BigInt(aux1) * BigInt(aux2)).toString();
  else result = (Number(aux1) * Number(aux2)).toString();

  let string = `${result.slice(0, result.length - offset)}.${result.slice(result.length - offset)}`;
  while (string[string.length - 1] === '0') string = string.substring(0, string.length - 1);
  if (string[string.length - 1] === '.') string = string.substring(0, string.length - 1);
  return string;
}

module.exports = { sum, sub, mul };
