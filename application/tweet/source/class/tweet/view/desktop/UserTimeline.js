/* ***********************************************************************************************

    Unify Project
    
    Homepage: unify-project.org
    License: MIT + Apache (V2)
    Copyright: 2009-2010 Deutsche Telekom AG, Germany, http://telekom.com

*********************************************************************************************** */
qx.Class.define("tweet.view.desktop.UserTimeline",
{
  extend : tweet.view.desktop.Abstract,
  type : "singleton",
  
  members : 
  {
    __requestId : null,  
  
    _createView : function()
    {
      var page = this.build(
      {
        create : qx.ui.tabview.Page,
        set :
        {
          label : "Sent", 
          icon : "qx/icon/Tango/32/apps/internet-blog.png"
        },
        layout :
        {
          create : qx.ui.layout.Grow
        },
        add:
        [
          {
            create : tweet.ui.desktop.List,
            id : "list"
          }
        ]
      });      
      
      var TwitterAuth = tweet.business.TwitterAuth.getInstance();
      TwitterAuth.addListener("completed", this._onTwitterCompleted, this);    
      this.__requestId = TwitterAuth.get("sent");
      
      return page;
    },
    
    _onTwitterCompleted : function(e)
    {
      // Verify request ID
      if (this.__requestId != e.getId()) {
        return;
      }

      // Retrieve data
      var data = e.getData();

      // Find list
      var list = this.getById("list");
      
      // Clear list
      list.removeAll();

      // Fill list with new content
      for (var i=0, l=data.length; i<l; i++) {
        list.add(new tweet.ui.desktop.Item(data[i]));
      }
    }    
  }  
});
