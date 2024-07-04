import './App.css'
import {CompanionApp} from "./apps/CompanionApp";
import {ConfigurationApp} from "./apps/ConfigurationApp.jsx";
import {useSelector} from "react-redux";
//reserved port 16341

function App() {
    const isEditMode = useSelector(state => state.system.isEditMode);

    if (isEditMode) {
        return <ConfigurationApp />
    }

    return <CompanionApp/>;
}

export default App
