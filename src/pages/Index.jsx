import React, { useState } from "react";
import { Container, VStack, Button, Input, List, ListItem, ListIcon, IconButton, useToast, Heading, FormControl, FormLabel, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaPlus, FaSave } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const toast = useToast();

  const handleAddEvent = () => {
    if (!inputValue) {
      toast({
        title: "Error",
        description: "Event description cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEditEvent = (id) => {
    const event = events.find((event) => event.id === id);
    setEditId(id);
    setEditText(event.text);
  };

  const handleSaveEdit = (id) => {
    const updatedEvents = events.map((event) => {
      if (event.id === id) {
        return { ...event, text: editText };
      }
      return event;
    });
    setEvents(updatedEvents);
    setEditId(null);
    setEditText("");
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading>Event Manager</Heading>
        <FormControl>
          <FormLabel>Add New Event</FormLabel>
          <InputGroup>
            <Input placeholder="Enter event description" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <InputRightElement children={<IconButton aria-label="Add event" icon={<FaPlus />} onClick={handleAddEvent} />} />
          </InputGroup>
        </FormControl>
        <List spacing={3} width="100%">
          {events.map((event) => (
            <ListItem key={event.id} d="flex" justifyContent="space-between" alignItems="center">
              {editId === event.id ? <Input value={editText} onChange={(e) => setEditText(e.target.value)} size="sm" /> : <Text>{event.text}</Text>}
              <div>
                {editId === event.id ? <IconButton aria-label="Save edit" icon={<FaSave />} onClick={() => handleSaveEdit(event.id)} /> : <IconButton aria-label="Edit event" icon={<FaEdit />} onClick={() => handleEditEvent(event.id)} />}
                <IconButton aria-label="Delete event" icon={<FaTrash />} onClick={() => handleDeleteEvent(event.id)} />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
