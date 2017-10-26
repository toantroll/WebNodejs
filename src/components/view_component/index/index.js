'use strict';

import React from 'react';
import IndexHeader from './index_header';
import IndexBanner from './index_banner';
import IndexSchedule from './index_chedule';
import IndexTrending from './index_trending';
import IndexNewArrival from './index_newarrival';
import ImportJs from './import_js';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    document.title = "Trang chủ";
  }
  render(){
    //<IndexSchedule/>
    //<IndexTrending/>
    return(
      <div>
        <IndexHeader/>
        <IndexBanner/>
        <IndexNewArrival/>
        <IndexSchedule/>
        <ImportJs/>
      </div>
    );
  }
}
