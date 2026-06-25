import eventModel from "../models/events.js";

//Functions array
const eventController = {}

//SELECT (POST) /api/events/getEvents
eventController.getEvents = async(req, res) => {
    try {
        //Get all events
        //Ask the page we are and the limit of events per page
        const page = parseInt(req.body.page) || 1; // Default to page 1 if not provided 
        const limit = parseInt(req.body.limit) || 20; // Default to 20 events per page if not provided

        // Skip the events that are on previous pages
        // For example, if we are on page 2 and the limit is 20, we want to skip the first 20 events (page 1) and get the next 20 events (page 2)
        const skip = (page - 1) * limit;

        const total = await eventModel.countDocuments(); // Get the total number of events
        const events = await eventModel.find().skip(skip).limit(limit); // Get the events for the current page. I can use populate and other methods to get more information about the events.

        return res.status(200).json({message: "Events retrieved successfully", events, "total": total, "page": page, "limit": limit }) // Return the events, total number of events, current page and limit per page   

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error getting events" })
    }
}

//INSERT (POST) /api/events/createEvent
eventController.createEvent = async(req, res) => {
    try {
        //#1- Request the data from the request body
        const { customerName, countPieces, eventDate } = req.body;

        //#2- Validate required fields
        if (!customerName || !countPieces || !eventDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        //#3- Fill the model with the data from the request body
        const newEvent = new eventModel({
            customerName,
            countPieces,
            eventDate
        });

        //#4- Save the new event on database
        await newEvent.save();

        //#5- Return the new event
        return res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating event" })
    }
}

//UPDATE (PUT) /api/events/updateEvent/:id
eventController.updateEvent = async(req, res) => {
    try {
        const {id} = req.params;
        const { customerName, countPieces, eventDate } = req.body;
        
        const updatedEvent = await eventModel.findByIdAndUpdate(
            id,
            { customerName, countPieces, eventDate },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating event" });
    }
};

//DELETE (DELETE) /api/events/deleteEvent/:id
eventController.deleteEvent = async(req, res) => {
    try {
        const deleted = await eventModel.findByIdAndDelete(req.params.id);
        if(!deleted) {
            return res.status(404).json({message: "Event not found"});
        }
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting event" });
    }
}

export default eventController;