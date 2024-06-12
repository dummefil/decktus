import './App.css'
import {CompanionApp} from "./apps/CompanionApp";
import {SetupApp} from "./apps/SetupApp";
//reserved port 16341

const stringToBoolean = (str) => {
    return str === 'true';
}

function App() {
    const params = new URLSearchParams(location.search);

    if (stringToBoolean(params.get('edit'))) {
        return <SetupApp />
    }

    return <CompanionApp/>;
}

export default App
