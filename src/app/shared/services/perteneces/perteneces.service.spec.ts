import { TestBed } from '@angular/core/testing';

import { PertenecesService } from './perteneces.service';

describe('PertenecesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PertenecesService = TestBed.get(PertenecesService);
    expect(service).toBeTruthy();
  });
});
