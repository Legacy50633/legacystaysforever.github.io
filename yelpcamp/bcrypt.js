const bcrypt = require('bcrypt')
const hashed  = async(p)=>{
   
    const hash = await bcrypt.hash(p,10)
    
    console.log(hash)
}
hashed('monkey')
const logier = async(p,hash)=>{
    const re = await bcrypt.compare(p,hash);
    if(re){
        console.log("come in")

    }
    else{
        console.log("pok u out")
    }
}
logier('monkay','$2b$10$WPOJn3oyvGIYnU0wxoS/meGA4NCfNL1oTJs0s0JAQLaSUL4bmZG3u'
)