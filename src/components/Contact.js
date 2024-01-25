const Contact = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl p-2 m-4">Contact us</h1>
      <form>
        <input type="text" className="border border-black p-2 m-2"
        placeholder="Name"></input>
        <input type="text" className="border border-black p-2 m-2"
        placeholder="Message"></input>
        <button className="border border-black p-2 m-2 rounded-lg bg-black text-white">Submit</button>
      </form>
    </div>
  )
}

export default Contact
