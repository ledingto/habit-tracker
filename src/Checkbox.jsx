function Checkbox({ text }) {
  return (
      <form>
        <input type="checkbox" name="habits" value="item" />
        <label for="habits">{text}</label>
      </form>
  )
}

export default Checkbox