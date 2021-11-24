const Notification = ({list}) => {
    console.log(list);
    return <div className="border border-text rounded py-10 mx-6 mb-10 text-left px-8">
        {list === [] && <h1 className="text-xl">No Plants To Water Today</h1>}
        <h1 className="text-xl">These Plants Need To Be Watered Today:</h1>
        {list.map((item)=>{
           
           return <p key={list.indexOf(item)} className="">{item.name}</p>
        })}
    </div>
};

export default Notification;
