/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {FlipperDoctor} from 'flipper-common';

export async function validateSelectedXcodeVersion(
  _selectedPath: string,
  _availableXcode: string | null,
  _subchecks: FlipperDoctor.HealthcheckRunSubcheck[],
): Promise<FlipperDoctor.HealthcheckRunResult> {
  return {
    hasProblem: false,
    message: ['ios.xcode-select--noop'],
  };
}
