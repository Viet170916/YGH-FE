export function getTimeConsume( dateTime: string ){
  const receivedTime:Date = new Date( dateTime.includes("Z")?dateTime:(dateTime+"Z") );
  const now:Date = new Date();
  const minute:number = Math.round( ((now.getTime()) - (receivedTime.getTime())) / (1000 * 60) );
  return minute <= 59 ? minute + " minutes ago" :
    (receivedTime.toLocaleDateString() === now.toLocaleDateString()) ? Math.round( (now - receivedTime) / (1000 * 60 * 60) ) + " hours ago" :
      (receivedTime.getFullYear() === now.getFullYear() && receivedTime.getMonth() === now.getMonth()) ? (now.getDate() - receivedTime.getDate()) + " days ago" :
        (receivedTime.getFullYear() === now.getFullYear() ? (now.getMonth() - receivedTime.getMonth()) + " months ago" :
          now.getFullYear() - receivedTime.getFullYear() + " years ago");

}

