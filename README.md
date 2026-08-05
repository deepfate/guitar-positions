# Guitar-Position-Trainer
Web app for training guitar positions based off of William Leavitt's "A Modern Method for Guitar" (Berklee Method).

To run, cd into project folder and run:
```
npm run dev
```

# To Do:
### System-Wide Architectural Stuff
- TypeScript Conversion

### Mobile Stuff
- Add a viewport check: Implement a custom React hook (like useMediaQuery) or just use CSS to stack your components vertically on screens under 768px.
- Add overflow-x: auto: Apply this to your main fretboard container so it can safely bleed off the right side of the screen on an iPhone.
- Test the Wheel: Open it on an actual iOS device (or an iOS simulator). See if touch-action: none is holding up against Safari's pull-to-refresh.
