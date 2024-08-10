import { render, screen, fireEvent } from '@testing-library/react';
import { fakeChats, fakeUsers } from '../../data/fakeDatabase';
import Home from '@/app/page';

describe('Home Page', () => { 
  const chat = fakeChats[0];

  it('renders the sidebar with user names', () => {
    render(<Home />);

    fakeUsers.forEach((user) => {
      const userNameElement = screen.getByText(user.username);
      expect(userNameElement).toBeInTheDocument();
    });
  });

  it('renders messages in the chat', () => {
    render(<Home />);

    chat.messages.forEach((message) => {
      expect(screen.getByText(message.content)).toBeInTheDocument();
    });
  });

  it('allows sending a new message', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Type a message') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test Message' } });
    
    const sendButton = screen.getByText(/send/i);
    fireEvent.click(sendButton);

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
});
