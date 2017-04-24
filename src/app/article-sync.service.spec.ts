import { TestBed, inject } from '@angular/core/testing';

import { ArticleSyncService } from './article-sync.service';

describe('ArticleSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleSyncService]
    });
  });

  it('should ...', inject([ArticleSyncService], (service: ArticleSyncService) => {
    expect(service).toBeTruthy();
  }));
});
