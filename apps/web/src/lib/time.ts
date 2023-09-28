const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  })
  
  const DIVISIONS: {amount: number, name: Intl.RelativeTimeFormatUnit}[] = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 7, name: "day" },
    { amount: 4.34524, name: "week" },
    { amount: 12, name: "months" }
  ]
  
  export function formatTimeAgo(date: bigint) {
    let duration = (Number(date) - new Date().getTime() / 1000)

    try {
        for (let i = 0; i < DIVISIONS.length; i++) {
            const division = DIVISIONS[i]
            if (Math.abs(duration) < division.amount) {
              return formatter.format(Math.round(duration), division.name)
            }
            duration /= division.amount
          }
          return formatter.format(Math.round(duration), "year")
       
    } catch (e) {
        console.error(e)
        return "some time ago"
    }
   }