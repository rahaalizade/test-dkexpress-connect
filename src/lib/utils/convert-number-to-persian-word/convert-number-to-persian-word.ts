const convertToPersianWord = (num: number): string => {
  const persianNumbers: { [key: number]: string } = {
    0: 'صفر',
    1: 'یک',
    2: 'دو',
    3: 'سه',
    4: 'چهار',
    5: 'پنج',
    6: 'شش',
    7: 'هفت',
    8: 'هشت',
    9: 'نه',
    10: 'ده',
    11: 'یازده',
    12: 'دوازده',
    13: 'سیزده',
    14: 'چهارده',
    15: 'پانزده',
    16: 'شانزده',
    17: 'هفده',
    18: 'هجده',
    19: 'نوزده',
    20: 'بیست',
    30: 'سی',
    40: 'چهل',
    50: 'پنجاه',
    60: 'شصت',
    70: 'هفتاد',
    80: 'هشتاد',
    90: 'نود',
    100: 'صد',
    200: 'دویست',
    300: 'سیصد',
    400: 'چهارصد',
    500: 'پانصد',
    600: 'ششصد',
    700: 'هفتصد',
    800: 'هشتصد',
    900: 'نهصد',
    1000: 'هزار',
  }

  if (num in persianNumbers) return persianNumbers[num]

  if (num < 100) {
    const tens = Math.floor(num / 10) * 10
    const ones = num % 10
    return persianNumbers[tens] + ' و ' + persianNumbers[ones]
  }

  if (num < 1000) {
    const hundreds = Math.floor(num / 100) * 100
    const remainder = num % 100
    return (
      persianNumbers[hundreds] +
      (remainder ? ' و ' + convertToPersianWord(remainder) : '')
    )
  }

  if (num < 1_000_000) {
    const thousands = Math.floor(num / 1000)
    const remainder = num % 1000
    return (
      (thousands > 1 ? convertToPersianWord(thousands) + ' ' : '') +
      'هزار' +
      (remainder ? ' و ' + convertToPersianWord(remainder) : '')
    )
  }

  return 'عدد بزرگ‌تر از حد مجاز است'
}
export { convertToPersianWord }
