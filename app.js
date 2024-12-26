const { useState } = React;

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    
    const entries = [
        {
            id: 1,
            term: "Dharma",
            content: "Cosmic law and order"
        },
        {
            id: 2,
            term: "Karma",
            content: "Action and its consequences"
        }
    ];

    const filteredEntries = entries.filter(entry =>
        entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>DivyaKosha</h1>
            <input
                type="text"
                className="search-input"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredEntries.map(entry => (
                <div key={entry.id} className="card">
                    <h2>{entry.term}</h2>
                    <p>{entry.content}</p>
                </div>
            ))}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
