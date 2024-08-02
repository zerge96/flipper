/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {css} from '@emotion/css';
import {Button, message, notification, Typography} from 'antd';
import React from 'react';
import {Layout} from './ui';
import {Store} from './reducers';
import {openDiyConnectivityFixModal} from './reducers/application';

type ConnectionUpdate = {
  key: string;
  type: 'loading' | 'info' | 'success' | 'success-info' | 'error' | 'warning';
  os: string;
  app: string;
  device: string;
  title: string;
  detail?: string;
};

type ErrorUpdate = {
  entries: Set<string>;
  orderedEntries: Array<string>;
};

const errorUpdates = new Map<string, ErrorUpdate>();

const className = css`
  .ant-message-notice-content {
    width: 30%;
  }
`;

export const connectionUpdate = (
  update: ConnectionUpdate,
  onClick: () => void,
  dispatch: Store['dispatch'],
) => {
  const title = `${update.app} on ${update.device} ${update.title}`;

  if (update.type === 'error') {
    const errors = errorUpdates.get(update.key) ?? {
      entries: new Set(),
      orderedEntries: [],
    };

    if (update.detail && !errors.entries.has(update.detail)) {
      errors.entries.add(update.detail);
      errors.orderedEntries.push(update.detail);
    }

    errorUpdates.set(update.key, errors);
    notification.error({
      key: update.key,
      message: title,
      description: (
        <Layout.Bottom>
          <div>
            {errors.orderedEntries.map((e, idx) => {
              return (
                <div key={idx} style={{marginBottom: 10}}>
                  <Typography.Text>{e}</Typography.Text>
                </div>
              );
            })}
          </div>
          <div>
            <Button
              type="primary"
              style={{float: 'right'}}
              onClick={() => {
                notification.close(update.key);

                onClick();
              }}>
              Troubleshoot
            </Button>
          </div>
        </Layout.Bottom>
      ),
      duration: 0,
      onClose: () => message.destroy(update.key),
    });
  } else {
    if (update.type === 'success' || update.type === 'success-info') {
      errorUpdates.delete(update.key);
    }

    let content = title;
    if (update.detail) {
      content += `\n ${update.detail}`;
    }
    let duration = 0;
    if (update.type === 'success' || update.type === 'success-info') {
      duration = 3;
    } else if (update.type === 'loading') {
      // seconds until show how to debug hanging connection
      duration = 30;
    }
    message.open({
      key: update.key,
      type: update.type === 'success-info' ? 'info' : update.type,
      content,
      className,
      duration,
      onClick:
        update.type !== 'loading'
          ? () => {
              message.destroy(update.key);
            }
          : undefined,
      // NOTE: `onClose` is only called when the message is closed by antd because of `duration`
      // It is not closed when we call `message.destroy(key)`.
      // Thus we can use it trigger a timeout modal for hanging "attempting to connect" messages
      onClose: () => {
        if (update.type === 'loading') {
          dispatch(
            openDiyConnectivityFixModal({app: update.app, os: update.os}),
          );
        }
      },
    });
  }
};
