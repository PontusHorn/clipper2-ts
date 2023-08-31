import { Clipper64, Paths64, Path64, Clipper } from '../src/public-api';
import { ClipperParse } from './clipperparse';


test('TestOpenPaths', () => {
  const testcases = ClipperParse.testCases(lines.split('\n'))

  testcases.forEach(testcase => {
    const c64 = new Clipper64();
    c64.addSubjectPaths(testcase.subj);
    c64.addOpenSubjectPaths(testcase.subj_open);

    const clip = new Path64();
    c64.addClip(clip);

    const solution = new Paths64();
    c64.execute(testcase.clipType, testcase.fillRule, solution);

    console.log('test', testcase)

    if (testcase.area > 0) {
      const area2 = Clipper.areaPaths(solution);
      const a = testcase.area / area2;

      expect(a).toBeGreaterThanOrEqual(0.995);
      expect(a).toBeLessThanOrEqual(1.005);

    }


    if (testcase.count > 0 && Math.abs(solution.length - testcase.count) > 0) {
      expect(Math.abs(solution.length - testcase.count)).toBeLessThan(2);
    }
  })
});

const lines = `
CAPTION: 1. 
CLIPTYPE: DIFFERENCE
FILLRULE: EVENODD
SOL_AREA: 8
SOL_COUNT: 1
SUBJECTS
5,4, 8,4, 8,8, 5,8
SUBJECTS_OPEN
6,7, 6,5
CLIPS
7,9, 4,9, 4,6, 7,6

CAPTION: 2. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,10, 10,10, 10,90, 90,90, 90,10, 60,10
CLIPS
0,0, 100,0, 100,100, 0,100

CAPTION: 3. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,90, 10,90, 10,10, 90,10, 90,90, 60,90
CLIPS
40,90, 10,90, 10,10, 90,10, 90,90, 60,90

CAPTION: 4. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,90, 10,90, 10,10, 90,10, 90,90, 60,90
CLIPS
0,0, 100,0, 100,100, 0,100

CAPTION: 5. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
10,40, 10,10, 90,10, 90,90, 10,90, 10,60
CLIPS
0,0, 100,0, 100,100, 0,100

CAPTION: 6. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
90,40, 90,10, 10,10, 10,90, 90,90, 90,60
CLIPS
0,0, 100,0, 100,100, 0,100

CAPTION: 7. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,10, 10,10, 10,90, 90,90, 90,10, 60,10
CLIPS
20,0, 120,0, 120,100, 20,100

CAPTION: 8. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,10, 10,10, 10,90, 90,90, 90,10, 60,10
CLIPS
-20,0, 80,0, 80,100, -20,100

CAPTION: 9. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,90, 10,90, 10,10, 90,10, 90,90, 60,90
CLIPS
20,0, 120,0, 120,100, 20,100

CAPTION: 10. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
40,90, 10,90, 10,10, 90,10, 90,90, 60,90
CLIPS
-20,0, 80,0, 80,100, -20,100

CAPTION: 11. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
10,40, 10,10, 90,10, 90,90, 10,90, 10,60
CLIPS
20,0, 120,0, 120,100, 20,100

CAPTION: 12. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
10,40, 10,10, 90,10, 90,90, 10,90, 10,60
CLIPS
-20,0, 80,0, 80,100, -20,100

CAPTION: 13. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
90,40, 90,10, 10,10, 10,90, 90,90, 90,60
CLIPS
20,0, 120,0, 120,100, 20,100

CAPTION: 14. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
90,40, 90,10, 10,10, 10,90, 90,90, 90,60
CLIPS
-20,0, 80,0, 80,100, -20,100

CAPTION: 15. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
65,-15, 65,-55, -5,-55
CLIPS
30,-80, 30,0, 50,0, 50,-80

CAPTION: 16. 
CLIPTYPE: INTERSECTION
FILLRULE: EVENODD
SOL_AREA: 0
SOL_COUNT: 0
SUBJECTS_OPEN
30,-80, 30,0
CLIPS
-5,-55, -5,-15, 65,-15, 65,-55

`