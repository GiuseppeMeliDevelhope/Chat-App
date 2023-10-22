import React,{useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
function Chat () {

    const navigate = useNavigate();
const [currentChat, setCurrentChat] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
          if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
          } else {
            const userData = JSON.parse(localStorage.getItem("chat-app-user"));
            setCurrentUser(userData);
            setIsLoaded(true);
          }
        };
      
        fetchData();
      }, []);
      
    
      useEffect(() => {
        const fetchData = async () => {
          if (currentUser) {
            if (currentUser.isAvatarImageSet) {
              try {
                const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(response.data);
              } catch (error) {
                console.error("Error:", error);
              }
            } else {
              navigate("/setAvatar");
            }
          }
        };
      
        fetchData(); 
      
      }, [currentUser]);
      
       const handleChatChange = (chat) =>{
        setCurrentChat(chat);
       };

    return(
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                
                 { isLoaded && currentChat === undefined ? (
                <Welcome currentUser={currentUser} />
                 ) : (

               <ChatContainer currentUser={currentUser} />
               
              ) }
               
            </div>
        </Container>
    )
}

const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
 .container{
    height:85vh;
    width:85vw;
    background-color:black;
    display:grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1020px) {
        grid-template-columns: 35% 65%;
    }
 }
`;

export default Chat;