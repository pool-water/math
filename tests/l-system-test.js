import {assert} from 'chai';
import {lsystem} from '../src/l-system/l-system.js';

describe("l-system", () => {
  describe("#lsystem", () => {
    it("should make strings of the right length", () => {
      let some_l = lsystem( "L", { "L": "LL", }, 0);
      assert(some_l.length == 1);
      let longer_string = lsystem( "L", { "L": "LL", }, 3);
      assert(longer_string.length == 8);
    });
  });
});
