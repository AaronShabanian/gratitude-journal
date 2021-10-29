export default function Greeting({user, gratitudes, hasSubmittedToday}) {
    return (
        <div>
            <h1 className= "text-white text-6xl">
                Hello, 
                <span className= "text-pink-300"> {user.email}</span>
            </h1>
            {
                hasSubmittedToday ? (
                    <h2 className="text-white text-3xl"> Today you're grateful for {gratitudes.slice(-1)[0].entry} </h2>
                ) :
                (
                    <h2 className="text-white text-3xl">What are you Grateful for today?</h2>
                )
            }
        </div>
    
    )
}