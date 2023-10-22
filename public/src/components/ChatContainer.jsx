import React from 'react'
import styled from 'styled-components';

function ChatContainer({ currentUser }) {
  return <Container>
    <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
            <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
                <h3>{currentUser.username}</h3>
            </div>
        </div>
    </div>
  </Container>
    
  
}

const Container = styled.div``;

export default ChatContainer;