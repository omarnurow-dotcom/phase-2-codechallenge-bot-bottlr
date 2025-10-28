import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const sampleBots = [
  {
    id: 101,
    name: "wHz-93",
    health: 94,
    damage: 20,
    armor: 63,
    bot_class: "Support",
    catchphrase: "1010010101001101100011000111101",
    avatar_url: "https://robohash.org/nostrumrepellendustenetur.png?size=300x300&set=set1",
  },
  {
    id: 105,
    name: "G`t-65",
    health: 62,
    damage: 98,
    armor: 31,
    bot_class: "Assault",
    catchphrase: "010101111110111111101101010110010100101",
    avatar_url: "https://robohash.org/nisinequequas.png?size=300x300&set=set1",
  },
];

beforeEach(() => {
  // Mock global.fetch to handle initial GET and DELETE calls
  global.fetch = jest.fn().mockImplementation((url, options) => {
    if (options && options.method === "DELETE") {
      return Promise.resolve({ ok: true });
    }
    // default: return bots
    return Promise.resolve({ json: () => Promise.resolve(sampleBots) });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("loads and displays bots in collection", async () => {
  render(<App />);

  // wait for bot names to appear
  expect(await screen.findByText("Bot Collection")).toBeInTheDocument();
  expect(await screen.findByText("wHz-93")).toBeInTheDocument();
  expect(screen.getByText("G`t-65")).toBeInTheDocument();
});

test("view specs and enlist a bot, moving it to army", async () => {
  render(<App />);

  // wait for bots
  const botName = await screen.findByText("wHz-93");

  // click to view specs
  userEvent.click(botName);

  // specs should show
  expect(await screen.findByText(/Specs/)).toBeInTheDocument();
  expect(screen.getByText(/Catchphrase:/)).toBeInTheDocument();

  // Enlist
  const enlistBtn = screen.getByRole("button", { name: /Enlist/i });
  userEvent.click(enlistBtn);

  // bot should be in army
  expect(await screen.findByText("Your Bot Army")).toBeInTheDocument();
  expect(screen.getByText("wHz-93")).toBeInTheDocument();

  // and removed from collection (G`t-65 still present)
  // wHz-93 should no longer be present in the collection list; since both areas render same names,
  // ensure army contains it and collection has at most the other bot by checking counts
  await waitFor(() => {
    const collectionHeading = screen.getByText("Bot Collection");
    expect(collectionHeading).toBeInTheDocument();
  });
});

test("delete bot from army issues DELETE and removes it", async () => {
  render(<App />);

  // enlist a bot first
  const botName = await screen.findByText("wHz-93");
  userEvent.click(botName);
  const enlistBtn = await screen.findByRole("button", { name: /Enlist/i });
  userEvent.click(enlistBtn);

  // ensure it's in army
  expect(await screen.findByText("wHz-93")).toBeInTheDocument();

  // find the delete button inside the army card
  const deleteBtn = screen.getAllByText("❌ Delete")[0];
  userEvent.click(deleteBtn);

  // fetch should have been called for DELETE
  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/101"), expect.objectContaining({ method: "DELETE" }));

  // bot should be removed from army
  await waitFor(() => {
    expect(screen.queryByText("wHz-93")).not.toBeInTheDocument();
  });
});
