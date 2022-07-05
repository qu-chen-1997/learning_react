/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, Form, Input, Row, Col, Space, Button } from "antd";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormItemLabelProps } from "antd/lib/form/FormItemLabel";

import { DatePicker, InfoItem } from "components";
import { FormValues } from "./types";

const defaultValue: FormValues = {
  eventName: "",
  eventContent: "",
  createTime: null,
};

const schema = yup.object({
  eventName: yup.string().required("请输入事务名称"),
  eventContent: yup.string().required("请输入事务内容"),
  createTime: yup
    .array()
    .typeError("请选择任务时间")
    .length(2, "请选择任务时间"),
});

const shareItemProps: Pick<FormItemLabelProps, "labelAlign" | "labelCol"> = {
  labelAlign: "left",
  labelCol: { span: 4 },
};
interface Props {
  eventState: FormValues | null;
  setEventState: React.Dispatch<React.SetStateAction<FormValues | null>>;
}
export default function TopSection({ eventState, setEventState }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log({ data });
    setEventState({
      eventName: data.eventName,
      eventContent: data.eventContent,
      createTime: data.createTime,
    });
  };
  return (
    <Card css={{ padding: 20 }} title="创建事务">
      <Row gutter={8}>
        <Col span={12}>
          <Row gutter={8}>
            <Col span={24}>
              <Controller
                control={control}
                name="eventName"
                render={({
                  field: { onChange, ...otherField },
                  fieldState,
                }) => (
                  <Form.Item
                    label="事务名称"
                    required
                    validateStatus={fieldState.error ? "error" : "success"}
                    help={fieldState.error?.message}
                    {...shareItemProps}
                    css={{
                      "& .ant-form-item-control-input-content": {
                        display: "flex",
                        justifyContent: "flex-start",
                      },
                    }}
                  >
                    <Input
                      {...otherField}
                      placeholder="请输入待办事项名称"
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      allowClear
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="createTime"
                render={({
                  field: { onChange, ...otherField },
                  fieldState,
                }) => (
                  <Form.Item
                    label="创建时间"
                    required
                    validateStatus={fieldState.error ? "error" : "success"}
                    help={fieldState.error?.message}
                    {...shareItemProps}
                  >
                    <DatePicker.RangePicker
                      {...otherField}
                      allowClear
                      showTime
                      placeholder={["任务开始时间", "任务结束时间"]}
                      onChange={(dates, dateString) => {
                        onChange(dates);
                      }}
                      css={{ width: "100%" }}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="eventContent"
                render={({
                  field: { onChange, ...otherField },
                  fieldState,
                }) => (
                  <Form.Item
                    label="事务内容"
                    required
                    validateStatus={fieldState.error ? "error" : "success"}
                    help={fieldState.error?.message}
                    {...shareItemProps}
                    css={{
                      "& .ant-form-item-control-input-content": {
                        display: "flex",
                        justifyContent: "flex-start",
                        "& .ant-input-affix-wrapper": {
                          width: "100%",
                        },
                        "& textarea": {
                          width: "100%",
                        },
                      },
                    }}
                  >
                    <Input.TextArea
                      {...otherField}
                      rows={4}
                      placeholder="请输入待办事项内容"
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      allowClear
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Space css={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" onClick={handleSubmit(onSubmit)}>
                  保存
                </Button>
                <Button
                  onClick={() => {
                    reset();
                  }}
                >
                  清空
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div
            css={{
              width: "100%",
              height: "100%",
              padding: "0px 40px",
              borderLeft: "1px solid #f5f5f5",
            }}
          >
            <Row gutter={8}>
              <Col span={24}>
                <InfoItem
                  title="事务名称"
                  value={eventState?.eventName as string}
                />
              </Col>
              <Col span={24}>
                <InfoItem
                  title="事务内容"
                  value={eventState?.eventContent as string}
                />
              </Col>
              <Col span={24}>
                <InfoItem
                  title="任务开始时间"
                  value={
                    eventState?.createTime
                      ? eventState?.createTime[0]
                        ? format(
                            eventState.createTime[0],
                            "yyyy-MM-dd hh:mm:ss"
                          )
                        : null
                      : null
                  }
                />
              </Col>
              <Col span={24}>
                <InfoItem
                  title="任务结束时间"
                  value={
                    eventState?.createTime
                      ? eventState?.createTime[1]
                        ? format(
                            eventState.createTime[1],
                            "yyyy-MM-dd hh:mm:ss"
                          )
                        : null
                      : null
                  }
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
