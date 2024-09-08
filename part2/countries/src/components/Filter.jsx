const Filter = ({ searchTerm, handleSearch }) => (
    <div>
      find countries <input value={searchTerm} onChange={handleSearch} />
    </div>
  )

export default Filter