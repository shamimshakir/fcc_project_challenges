const { useState, useEffect } = React;
    function App() {
        const url = `https://forum-proxy.freecodecamp.rocks/latest`;
        const [topics, setTopics] = useState([]);
        const [users, setUsers] = useState([]);
        const [loding, setLoading] = useState(true);
        async function fetchForumTopics(){
            setLoading(true);
            try{
                const response = await fetch(url);
                const topicslist = await response.json();
                setTopics(topicslist.topic_list.topics);
                setUsers(topicslist.users);
                setLoading(false);
            }catch (error){
                setLoading(false);
            }
        }

        useEffect(() => {
            fetchForumTopics();
        }, []);
        if(loding){
            return <div className="loader"></div>
        }
        return (
            <div className="fccForum">
                <h3>FCC Forum</h3>
                <div className="forumTopics">
                    <div className="singleTopic singleTopicHead">
                        <div className="topicSl">#</div>
                        <div className="topicName">Topic</div>
                        <div className="recentUsers">Recent Users</div>
                        <div className="topicReplies">Replies</div>
                        <div className="topicViews">Views</div>
                        <div className="topicActivity">Activity</div>
                    </div>

                    {topics.map((topic,index) => {
                        return <div className="singleTopic" key={index}>
                            <div className="topicSl">{index+1}</div>
                            <div className="topicName">
                                <a href="">{ topic.title.substr(0, 50) }</a>
                            </div>
                            <div className="recentUsers">
                                {
                                    users.map((user) => {
                                        let check = false;
                                        topic.posters.forEach(poster => {
                                            if(poster.user_id === user.id){
                                                check = true;
                                            }
                                        });

                                        if(check){
                                            return <a href={`https://www.freecodecamp.org/forum/u/${user.username}`} key={user.id}>
                                                <img src={`https://freecodecamp.org/forum${user.avatar_template.replace('{size}', 135)}`} alt=""/>
                                            </a>;
                                        }
                                    })
                                }
                            </div>
                            <div className="topicReplies">{topic.reply_count}</div>
                            <div className="topicViews">{topic.views}</div>
                            <div className="topicActivity">{moment(topic.bumped_at).fromNow(true)}</div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
    ReactDOM.render(<App />, document.getElementById("root"));
