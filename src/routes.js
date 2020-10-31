import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanangesMap from './pages/OrphanangesMap'

function Routes() {
    return (
        <BrowserRouter>
           <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/app" component={OrphanangesMap} />
           </Switch>
        </BrowserRouter>
    )
}

export default Routes
