All code in 'imports' is never called/loaded unless explicitly stated.
All code can be imported from both client and server here.

Any file named methods.js is loaded/imported from server, but those methods are callable from client.
Any file named just 'playlists.js' or 'users.js' is imported from client to gain access to DB.

Any directory named server/, all files are only loaded/imported on server.
