import { TestBed, inject } from '@angular/core/testing';

import { EditEffectsService } from './edit-effects.service';

describe('EditEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditEffectsService]
    });
  });

  it('should ...', inject([EditEffectsService], (service: EditEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
