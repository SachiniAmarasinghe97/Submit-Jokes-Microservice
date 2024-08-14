import Joke from "../model/jokeModel.js"

export const create = async (req, res) => {
    try{
        const jokeData = new Joke(req.body);
        //if joke already exist or not
        const {content}= jokeData;
        const jokeExist = await Joke.findOne({content});
        if (jokeExist){
            return res.status(400).json({message:"Joke already exists."});
        }
        const savedJoke = await jokeData.save();
        res.status(200).json(savedJoke);

        // const jokeData = new Joke(req.body);  // Create a new Joke instance with the request body
        // const savedJoke = await jokeData.save();  // Save the joke to the database
        // res.status(201).json(savedJoke);  // Respond with the saved joke and a 201 status code for "Created"
    }catch(error){
        console.error(error);  // Log the error for debugging
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const fetch = async (req, res)=>{
    try{
            const jokes = await Joke.find();
            if(jokes.length === 0){
                return res.status(404).json({message: "Joke Not Found."})
            }
            res.status(200).json(jokes);
    } catch (error){
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const fetchOneJoke = async (req, res)=>{
    try{
        //First check the user entered id is exist in the db
        const id = req.params.id;
        const jokeExist = await Joke.findOne({_id:id})
        if(!jokeExist){
                return res.status(404).json({message:"Joke Not Found."})
        }
        res.status(200).json(jokeExist);
    } catch (error){
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const update = async (req, res)=>{
    try{
        //First check the user entered id is exist in the db
        const id = req.params.id;
        const jokeExist = await Joke.findOne({_id:id})
        if(!jokeExist){
                return res.status(404).json({message:"Joke Not Found."})
        }
        const updateJoke = await Joke.findByIdAndUpdate(id, req.body, {
            new:true,
        });
        res.status(201).json(updateJoke);
    } catch (error){
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const deleteJoke = async (req, res)=>{
    try{
        //First check the user entered id is exist in the db
        const id = req.params.id;
        const jokeExist = await Joke.findOne({_id:id})
        if(!jokeExist){
                return res.status(404).json({message:"Joke Not Found."})
        }
        await Joke.findByIdAndDelete(id);
        res.status(201).json({message: "User deleted successfully."});
    } catch (error){
        res.status(500).json({error: "Internal Server Error."});
    }
};