import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('adds a note with a title and body from the editor', async () => {
  const user = userEvent.setup();
  render(<App />);

  const titleInput = screen.getByLabelText(/note title/i);
  const textarea = screen.getByLabelText(/write a note/i);

  await user.type(titleInput, 'Launch plan');
  await user.type(textarea, 'Finalize the roadmap');
  await user.click(screen.getByRole('button', { name: /add note/i }));

  expect(screen.getByText('Launch plan')).toBeInTheDocument();
  expect(screen.getByText('Finalize the roadmap')).toBeInTheDocument();
  expect(screen.getByText(/1 note/i)).toBeInTheDocument();
});
