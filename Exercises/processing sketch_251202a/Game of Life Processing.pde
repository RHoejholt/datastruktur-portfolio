
int cols = 60;            // change before start if you want a different grid size
int rows = 40;
int cellSize = 12;
int spawns = 800;

GridModel model;
GridView view;
int generation = 0;

void settings() {

    size(cols * cellSize, rows * cellSize + 30); // extra space for text
}

void setup() {

  frameRate(12); // a few ms between generations, tweak if you like
  model = new GridModel(cols, rows);
  view = new GridView(cols, rows, cellSize);
  // start with blank white background + grid (we'll draw each frame anyway)
  background(255);
    view.drawGridLines();
    
  for (int i = 0; i < spawns; i++) {
    int rx = (int)random(cols);
    int ry = (int)random(rows);
    model.setAlive(rx, ry, true);
  }

}

void draw() {
  stroke(255);
  fill(255);
  rect(0, height-20, 90, 30);
  // compute next generation based on model (neighbors + rule function)
  model.computeNextGeneration();

  // copy model to view (view is a grid too, per requirement)
  view.copyFromModel(model);

  // draw cells with red/green based on coords
  view.renderCells();

  // draw generation counter
  fill(0);
  textAlign(LEFT, CENTER);
  text("generation: " + generation, 6, height - 15);

  generation++;
}


// ---------- model: stores current state and computes next ----------

class GridModel {
  int w, h;
  boolean[][] cells;
  boolean[][] next; // next generation

  GridModel(int w_, int h_) {
    w = w_;
    h = h_;
    cells = new boolean[w][h];
    next = new boolean[w][h];
    // todo: could randomly seed here but spec wants 5 random slots per frame
  }

  void setAlive(int x, int y, boolean v) {
    if (inBounds(x, y)) cells[x][y] = v;
  }

  boolean isAlive(int x, int y) {
    if (!inBounds(x, y)) return false;
    return cells[x][y];
  }

  boolean inBounds(int x, int y) {
    return x >= 0 && y >= 0 && x < w && y < h;
  }

  // counts neighbors for the given cell (no wrapping)
  int countNeighbors(int x, int y) {
    // lazy neighbor counter, checks 8 neighbors
    int cnt = 0;
    for (int dx = -1; dx <= 1; dx++) {
      for (int dy = -1; dy <= 1; dy++) {
        if (dx == 0 && dy == 0) continue;
        int nx = x + dx;
        int ny = y + dy;
        if (inBounds(nx, ny) && cells[nx][ny]) cnt++;
      }
    }
    return cnt;
  }

  // decide next state for a single cell based on rules
  boolean decideNextState(boolean currentlyAlive, int neighborCount) {
    // rules:
    // <2 -> die; 2 -> live only if was alive; 3 -> alive; >3 -> die
    if (neighborCount < 2) return false;
    if (neighborCount == 2) return currentlyAlive;
    if (neighborCount == 3) return true;
    return false; // neighborCount > 3
  }

  // compute the next generation for the whole grid (simultaneous)
  void computeNextGeneration() {
    // compute into next[][] then swap
    for (int x = 0; x < w; x++) {
      for (int y = 0; y < h; y++) {
        int n = countNeighbors(x, y);
        next[x][y] = decideNextState(cells[x][y], n);
      }
    }
    // swap arrays (simple copy here - could be optimized)
    for (int x = 0; x < w; x++) {
      for (int y = 0; y < h; y++) {
        cells[x][y] = next[x][y];
      }
    }
  }
}


// ---------- view: also a grid, renders based on model ----------

class GridView {
  int w, h, cs;
  boolean[][] viewCells;
  boolean[][] lastFrame;   // <- store previous frame for knowing who died

  GridView(int w_, int h_, int cellSize_) {
    w = w_;
    h = h_;
    cs = cellSize_;
    viewCells = new boolean[w][h];
    lastFrame = new boolean[w][h];
  }

  // copy model state into view grid
  void copyFromModel(GridModel m) {
    // stash previous frame before overwriting
    for (int x = 0; x < w; x++) {
      for (int y = 0; y < h; y++) {
        lastFrame[x][y] = viewCells[x][y];
        viewCells[x][y] = m.isAlive(x, y);
      }
    }
  }

  // draw grid lines
  void drawGridLines() {
    stroke(220);
    for (int x = 0; x <= w; x++) {
      line(x * cs, 0, x * cs, h * cs);
    }
    for (int y = 0; y <= h; y++) {
      line(0, y * cs, w * cs, y * cs);
    }
    stroke(0);
    line(0, h * cs, w * cs, h * cs);
  }

void renderCells() {
  noStroke();

  int pad = 2;
  int size = cs - pad*2;

  for (int x = 0; x < w; x++) {
    for (int y = 0; y < h; y++) {

      int px = x*cs + pad;
      int py = y*cs + pad;

      if (viewCells[x][y]) {
        // alive -> draw color
        int r = (x * 7) % 256;
        int g = (y * 13) % 256;
        int b = 150;
        fill(r, g, b);
        rect(px, py, size, size);

      } else {
        if (lastFrame[x][y]) {
          // JUST died -> white wipe
          fill(255);
          rect(px, py, size, size);
        } else {
          // long-dead -> redraw empty cell interior
          fill(255);         // SAME as background
          rect(px, py, size, size);
        }
      }
    }
  }
}

}
