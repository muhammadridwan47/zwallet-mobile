
export default function CountMoney(money) {


    if(money.length !== 0)
    {

        // function myFunc(total, num) {
        //     return total + num;
        // }
        let save = []
        save.push(money)
        let bilangan =  save.reduce()
        var	reverse = bilangan.toString().split('').reverse().join(''),
        rupiah 	= reverse.match(/\d{1,3}/g);
        return rupiah.join('.').split('').reverse().join('');
    }else{
        return 0
    }

}
