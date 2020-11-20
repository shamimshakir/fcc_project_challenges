const { useState, useEffect } = React;
    const url = `https://course-api.com/react-tours-project`;

    function Blogs({posts}) {
        const [readmore, setReadmore] = useState(false);
        return (
            <div className="blogPosts">
                <h2>Travel Posts</h2>
                {posts.map(post => {
                    return <div key={post.id} className="singlePost">
                        <img src={post.image} alt=""/>
                        <h2>{post.name}</h2>
                        <p>{readmore ? post.info : post.info.substring(0,100)}</p>
                        <a onClick={() => {setReadmore(!readmore)}} className="readmore">{readmore ? "Show less" : "Show more"}</a>
                        <button></button>
                    </div>
                })}
            </div>
        );
    }

    function App() {
        const [loading, setLoading] = useState(true);
        const [posts, setPosts] = useState([]);

        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const blogs = await response.json();
                setLoading(false);
                setPosts(blogs);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        useEffect(() => {
            fetchBlogs();
        }, []);

        if (loading) {
            return (
                <div className="loading">
                    <h2>Loading...</h2>
                </div>
            );
        }
        return <Blogs posts={posts} />;
    }

    ReactDOM.render(<App />, document.getElementById("root"));
