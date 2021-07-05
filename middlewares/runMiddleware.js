
function isNumber(req,res,next){
    const {distance} = req.body;
    if(isNaN(distance)){
        return res.status(400).json({message:"Дистанция должна быть целым или дробным числом"});
    }
    next();
}
function timeFormat(req,res,next){
    const {time} = req.body;
    const regex = /^[0-9]+:[0-9]{1,2}:[0-9]{1,2}$/;
    if (!regex.test(time))
    {
        return res.status(400).json({message:"Не правильный формат времени(hh:mm:ss)"});
    }
    next();
}

export {isNumber,timeFormat};