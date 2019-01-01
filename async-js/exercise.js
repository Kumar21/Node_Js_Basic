/* getCustomer(1, (customer)=>{
console.log('customer',customer.name);
if(customer.isgold){
    getTopMovies((movies)=>{
        console.log('Top mOvies',movies);
        sendEmail(customer.email,movies,()=>{
            console.log("Email Sent.... with movies ", movies)
        })
    })
}
}) */
async function displayCustomer(){
   try{
       const customer = await getCustomer(1);
       console.log('Customer info : ',customer);
       if (customer.isgold){
           const movies= await getTopMovies();
           console.log('Top Movies: ',movies)
          await sendEmail(customer.email,movies);
               console.log('Email sent...',customer.email);
            }
   }catch(err){
       console.log(err);
   }
}

displayCustomer();
function getCustomer(id){
    return new Promise ((resolve)=>{
        setTimeout(() => {
            resolve({
                id:id,
                name:'Kumar',
                isgold:true,
                email:'Kumar@gamil.com'
            })
        }, 2000);
    })
}
function getTopMovies(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve({
                movies:['movie1','movie2','movie3','movie4']
            })
        }, 2000);
    })
}
function sendEmail(email,movies){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(console.log("Email sending ... to : ",email))
        }, 2000);
    })
}

