const Filter = ({ searchTerm, handleSearch }) => (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearch} />
    </div>
  )

export default Filter