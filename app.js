function SearchIcon() {
    return (
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function Card(props) {
    var entry = props.entry;
    var searchTerm = props.searchTerm;

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function highlightText(text, term) {
        if (!term) return text;
        var regex = new RegExp("(" + term + ")", 'gi');
        var parts = text.split(regex);
        return parts.map(function(part, i) {
            return regex.test(part) ? 
                React.createElement("span", { key: i, className: "highlight" }, part) : 
                part;
        });
    }

    return (
        <div className="card">
            <h2>{highlightText(entry.term, searchTerm)}</h2>
            <div className="card-meta">
                Compiled: {formatDate(entry.compiledDate)} | 
                Last Modified: {formatDate(entry.modifiedDate)}
            </div>
            <div className="card-content">
                {highlightText(entry.content, searchTerm)}
            </div>
            {entry.sharedTerms && (
                <div className="shared-terms">
                    {entry.sharedTerms.map(function(term, index) {
                        return (
                            <span key={index} className="term-tag">
                                {term}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function App() {
    var [searchTerm, setSearchTerm] = React.useState('');

    var filteredEntries = kosha_entries.filter(function(entry) {
        if (!searchTerm.trim()) return true;
        
        var searchTermLower = searchTerm.toLowerCase();
        var termMatch = entry.term.toLowerCase().includes(searchTermLower);
        var contentMatch = entry.content.toLowerCase().includes(searchTermLower);
        var sharedTermMatch = false;
        
        if (entry.sharedTerms) {
            sharedTermMatch = entry.sharedTerms.some(function(term) {
                return term.toLowerCase().includes(searchTermLower);
            });
        }
        
        return termMatch || contentMatch || sharedTermMatch;
    });

    return (
        <div className="container">
            <div className="header">
                <h1>DivyaKosha</h1>
                <p>A Spiritual Terms Dictionary</p>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={function(e) { setSearchTerm(e.target.value); }}
                />
                <SearchIcon />
            </div>

            <div className="search-instructions">
                Type to search through terms, definitions, and related concepts
            </div>

            {filteredEntries.map(function(entry) {
                return (
                    <Card 
                        key={entry.id} 
                        entry={entry} 
                        searchTerm={searchTerm}
                    />
                );
            })}
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
