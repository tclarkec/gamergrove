import React from 'react';
import './dashboard.css';

import BoardCard from '../Cards/boardCard.jsx';
import ReviewCard from '../Cards/reviewCard.jsx';


function Dashboard() {
  return (
    <div>
      <main>
        <h1>User Dashboard!</h1>

          <button class='boardbutton' onclick="alert('Button clicked!')" >Click me</button>
      
        <input id="radio1" type="radio" name="css-tabs" defaultChecked />
        <input id="radio2" type="radio" name="css-tabs" />
        <input id="radio3" type="radio" name="css-tabs" />
        <input id="radio4" type="radio" name="css-tabs" />
        <input id="radio5" type="radio" name="css-tabs" />
        <div id="tabs">
          <label htmlFor="radio1" id="tab1">Boards</label>
          <label htmlFor="radio2" id="tab2">Reviews</label>
          <label htmlFor="radio3" id="tab3">Games</label>
          <label htmlFor="radio4" id="tab4">Wishlist</label>
          <label htmlFor="radio5" id="tab5">Settings</label>
        </div>
        <div id="content">
          <section id="content1">
            {/* <h3>Boards</h3> */}

            <div>
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            </div>
          </section>


         {/* <section id="content1" className="row">
            <div className="col-md-3">
              <BoardCard />
            </div> */}

          {/* </section> */}
          <section id="content2">
            {/* <h3>Reviews</h3> */}
            <ReviewCard />

          </section>
          <section id="content3">
            <h3>Interesting Heading Text</h3>
            <p>Fusce pulvinar porttitor dui, eget ultrices nulla tincidunt vel. Suspendisse faucibus lacinia tellus, et viverra ligula. Suspendisse eget ipsum auctor, congue metus vel, dictum erat. Aenean tristique euismod molestie. Nulla rutrum accumsan nisl, ac semper sapien tincidunt et. Praesent tortor risus, commodo et sagittis nec, aliquam quis augue. Aenean non elit elementum, tempor metus at, aliquam felis.</p>
          </section>
          <section id="content4">
            <h3>Here Are Many Words</h3>
            <p>Vivamus convallis lectus lobortis dapibus ultricies. Sed fringilla vitae velit id rutrum. Maecenas metus felis, congue ut ante vitae, porta cursus risus. Nulla facilisi. Praesent vel ligula et erat euismod luctus. Etiam scelerisque placerat dapibus. Vivamus a mauris gravida urna mattis accumsan.</p>
            <p>Duis sagittis massa vel elit tincidunt, sed molestie lacus dictum. Mauris elementum, neque eu dapibus gravida, eros arcu euismod metus, vitae porttitor nibh elit at orci. Vestibulum laoreet id nulla sit amet mattis.</p>
          </section>
          <section id="content5">
            <h3>Here Are Many Words</h3>
            <p>Vivamus convallis lectus lobortis dapibus ultricies. Sed fringilla vitae velit id rutrum. Maecenas metus felis, congue ut ante vitae, porta cursus risus. Nulla facilisi. Praesent vel ligula et erat euismod luctus. Etiam scelerisque placerat dapibus. Vivamus a mauris gravida urna mattis accumsan.</p>
            <p>Duis sagittis massa vel elit tincidunt, sed molestie lacus dictum. Mauris elementum, neque eu dapibus gravida, eros arcu euismod metus, vitae porttitor nibh elit at orci. Vestibulum laoreet id nulla sit amet mattis.</p>
          </section>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
