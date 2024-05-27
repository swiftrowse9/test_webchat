require('dotenv').config();

async function render_database(database, req, res, next, page) {
    
    try {
        const data = await database.find({});
        const mappedData = data.map(item => item.toObject());

        res.render(page, { 
            data: mappedData ,
            access_token: process.env.PAGE_ACCESS_TOKEN
        });

    } catch (err) {

        console.error("Error:", err);

        if (err.name === 'MongoTimeoutError') {

            res.status(500).send('Database operation timed out');

        } else {

            res.render('index.cl7');
        }
    }
}


function render_toObjDB(mongoose){

    return mongoose ? mongoose.toObject() : mongoose;
}

function render_list_database(list_mongoose){
    
    return list_mongoose.map(mongoose => mongoose.toObject());
}

module.exports = {
    
    render_database,
    render_toObjDB,
    render_list_database,
};
























